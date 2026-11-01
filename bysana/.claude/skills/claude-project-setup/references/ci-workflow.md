# CIワークフロー・依存メンテナンスの雛形集

claude-project-setupスキルのStep 3（GitHub利用時）で `.github/workflows/ci.yml` や `.github/dependabot.yml` を生成する際の参照テンプレート。**そのままコピーせず、Step 1で検出した実際のコマンド（lint/型チェック/build）に必ず置き換える**こと。検出できていないコマンドをCIに書くと、初回から赤いバツが付き続けて「CIは壊れているのが普通」という最悪の学習を与える。

## 共通の方針

- トリガーは `pull_request` と `push`（`main`）の両方。
- ジョブは「lint」「型チェック」「build」を基本とし、検出できたものだけ入れる。テストが無いなら `npm test` を書かない。
- このリポジトリは `main` へのpushで `deploy.yml` が走り即デプロイされる。CIの `build` が通ったPRだけを `main` に入れる運用（ブランチ保護）にすると、壊れたビルドが本番に出るのを防げる。

## Next.js

`bysana/` がリポジトリ直下ではなく**サブディレクトリ**にある点に注意（`working-directory` を指定する）。パッケージマネージャは Step 1 で確定したものに合わせる（下記は npm の例。pnpm なら `pnpm/action-setup` と `pnpm install --frozen-lockfile` に読み替える）。

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: bysana
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: bysana/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
```

注意点：

- `npm ci` は `package-lock.json` を厳密に使う。lockfileが `package.json` とずれていると失敗するので、導入前にローカルで `npm ci` が通ることを確認する
- Nodeのバージョンは `package.json` の `engines` や実際のデプロイ先に合わせる。分からなければユーザーに確認する
- `npm run build` が環境変数を必要とする場合は、CIにダミー値を渡す（本物の秘密情報をCIに渡さない）
- `npm run lint` が既存コードの指摘で初回から落ちる場合は、先にローカルで通してから有効化する

## シークレットスキャン（推奨）

人間がGitHub上で直接コミットした秘密情報を継続的に見張る層はCIにしか置けない。gitleaks CLI（MITライセンス・シークレット設定不要）をdockerで直接実行する。

```yaml
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0        # コミット履歴全体を検査する
      - run: |
          docker run --rm -v "$GITHUB_WORKSPACE:/repo:ro" \
            ghcr.io/gitleaks/gitleaks:v8.30.1 \
            detect --source /repo --redact -v
```

- `gitleaks-action` はv2以降が独自ライセンスで、Organizationではライセンスキーが要る。設定ゼロで動くCLI直接実行を既定にする
- イメージは `ghcr.io/gitleaks/gitleaks`（Docker Hubは匿名pull制限がある）。タグで固定し `:latest` を使わない。`--redact` で値をログに出さない
- `run:` 内のdocker imageはDependabotの追従対象外。`project-health-check` で定期的に最新版を確認する
- 検出時にやるべきことは「履歴の掃除」より先に**そのキーの無効化・再発行**
- GitHub本体の **Secret scanning / Push protection**（Settings → Code security）も有効化を案内する。公開リポジトリでは無料

## Dependabot（`.github/dependabot.yml`）

リポジトリ直下ではなく `bysana/` に `package.json` があるので `directory` を合わせる。

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /bysana
    schedule:
      interval: weekly
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

## ブランチ保護（CIを「強制」に変える設定）

CIを置いただけでは失敗しても取り込める。`main` への直push禁止とCI成功のマージ条件化を案内する。

- **GitHub UIから**: Settings → Rules → Rulesets で、デフォルトブランチに「Require a pull request before merging」と「Require status checks to pass」（上の `check` ジョブ）を有効にする
- **gh CLIから**（ユーザーの合意を得てから実行する）:

```bash
gh api repos/{owner}/{repo}/rulesets -X POST --input - <<'JSON'
{
  "name": "protect-default-branch",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["~DEFAULT_BRANCH"], "exclude": [] } },
  "rules": [
    { "type": "pull_request", "parameters": { "required_approving_review_count": 0, "dismiss_stale_reviews_on_push": false, "require_code_owner_review": false, "require_last_push_approval": false, "required_review_thread_resolution": false } },
    { "type": "required_status_checks", "parameters": { "strict_required_status_checks_policy": false, "required_status_checks": [ { "context": "check" } ] } }
  ]
}
JSON
```

1人開発なら `required_approving_review_count` は0。無料プランのプライベートリポジトリではルールセットが使えない場合がある——その場合は事実を隠さず、「直pushしない」を運用ルールとして書くにとどめる。
