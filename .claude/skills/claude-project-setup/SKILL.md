---
name: claude-project-setup
description: このNext.js(React/TypeScript)プロジェクトにClaude Code用の.claude/環境を対話形式でセットアップ・見直しする。settings.jsonの権限・hooks設定、必要に応じたカスタムskill・command・subagentの雛形作成、CLAUDE.mdのビルド/実行/テストコマンド欄の穴埋めを行う。「セットアップして」「環境構築して」「init」「このプロジェクトでClaude Codeを使えるようにして」「開発を始めたいので準備して」といった依頼で使うこと。ビルトインの/initはCLAUDE.mdのドキュメント生成に特化しているが、権限設定やskill/command/agentの追加が絡む場合はこちらを使う。
---

# Claude Project Setup

Claude Codeが最初から気持ちよく働けるように `.claude/` 環境を整えるスキル。目的は「テンプレートを埋める」ことではなく、**そのプロジェクト固有の開発フローに合った設定を対話で見極めて反映する**こと。

このスキルは **Next.js / React / TypeScript プロジェクト**を前提に絞り込んである。他スタックの分岐は入れていないので、前提が変わったら書き足すこと。

## 進め方の全体像

1. プロジェクトを自動検出する
2. 検出できなかった部分・曖昧な部分をユーザーに確認しながら埋める
3. `.claude/settings.json` を作る/更新する、あわせて `.gitignore` を整備する
4. 繰り返し作業があれば、Skill・Command・Subagent のどれが適切かを判断して雛形を作る
5. `CLAUDE.md` のビルド/実行/テストコマンド欄を埋める
6. 変更点をまとめて提示する

一度に全部をヒアリングせず段階を踏む。**自動検出できることは検出し、分からないことだけ聞く**バランスを保つ。

## Step 1: プロジェクトを自動検出する

- `package.json`（`scripts` がそのままコマンド定義。`dependencies` から `next` / `react` のバージョン、`sass` / `tailwindcss` などスタイリング、`remark` / `gray-matter` などコンテンツ処理を読み取る）
- ロックファイル（`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock`）。**複数あるとどのパッケージマネージャが正か曖昧**になる。`pnpm-workspace.yaml` の有無、デプロイ設定（`appspec.yml`、`.github/workflows/`）がどれを使っているかで判断し、曖昧なら確認する
- `tsconfig.json`（`strict`、パスエイリアス）、`eslint.config.*`（`eslint-config-next` を使っているか）
- App Router（`src/app/`）か Pages Router（`pages/`）か。`next.config.*` の設定
- 既存の `.claude/`（`settings.json`, `skills/`, `commands/`, `agents/`）、`CLAUDE.md`、`.gitignore` の内容（Step 3で重複や上書きをしないため）
- テストの有無。`scripts` に `test` が無ければ**テストが無いという事実をそのまま扱う**——存在しないテストコマンドを許可リストやCIに書かない

コマンドが `package.json` の `scripts` に定義されているので、**ここはユーザーに聞かなくてよい**。ただし「コマンドはあるが実際に動くか怪しい」状態（lintが通らない、型エラーが残っている等）は、黙って無視せずギャップとして扱い、Step 6で報告する。**プロジェクトの状態を偽って「動く」と書かない**こと。

## Step 2: 対話で補完する

自動検出で埋まらなかった項目は AskUserQuestion などでユーザーに確認する。まとめて聞きすぎず、自然な流れで聞いていく。

### 使うAIツールの確認

Claude Code以外のAIコーディングツール（Codex、Cursor等）も併用するかを確認する。併用する場合、`.claude/settings.json` のdenyやhookはそれらのツールでは**一切強制されない**ため、CI・ブランチ保護（Step 3）の優先度を一段上げる——ツールに依存しない唯一の強制層になる。

### 繰り返し行う作業の洗い出し

記事（`posts/*.md`）の追加手順、新しいプロダクトページの追加、画像最適化など**繰り返す作業**を聞き出す。挙がったら Skill / Command / Subagent のどれが自然かを判断する。迷う場合だけ聞く。目安：

- **Command（`.claude/commands/*.md`）**: 1アクションで完結する定型操作。引数を受け取ってすぐ実行に移る、手続きが短いもの
- **Skill（`.claude/skills/*/SKILL.md`）**: 複数ステップにまたがる再利用可能なワークフロー。状況に応じた判断が必要だったり、参照資料を伴うもの
- **Subagent（`.claude/agents/*.md`）**: 特定の役割に特化し、ツールセットを絞ったり別文脈で動かしたいもの

作りたいものが無ければスキップしてよい——使いもしない雛形を量産しても意味がない。

## Step 3: `.claude/settings.json` を作る/更新する

安全に許可してよいコマンドを `permissions.allow` に提案する。`Bash(npm run lint:*)`, `Bash(npm run build:*)`, `Bash(npx tsc:*)`, `Bash(npm audit:*)` や、読み取り系のgit（`git status`, `git diff`, `git log`）のように、実行しても状態を壊さない・すぐ終わるコマンドを中心にする。破壊的な操作（`rm -rf`, `git push --force` など）は決して許可リストに入れない。

`npm run dev` / `npm start` のように**プロセスを常駐させるコマンド**は、機械的に許可リストへ入れず、必要そうなら一言確認してから加える。`npm install` は `node_modules` と lockfile を書き換えるので、許可するかは確認する。

### deny ベースラインの扱い

`settings.json` には危険な操作（`rm -rf`, `git push --force`, `git reset --hard`, `git clean` 等）と秘密情報の読み取り（`.env`, 秘密鍵, `~/.ssh` 等）をブロックする `permissions.deny` のベースラインが入っている。permissionルールは前方一致でフラグ後置の変種（例: `git push origin main --force`）をすり抜けるため、コマンドをトークン解析してブロックする `PreToolUse` hook（`.claude/hooks/deny_dangerous_bash.py`、回帰テスト同梱）も設定済み。

ベースラインは初期値であって聖域ではない。**ユーザーから明示的な依頼があれば、そのルールを外すと何が守れなくなるかを説明した上で個別に緩和してよい**（例: `--force-with-lease` だけ許可）。緩和は依頼されたルール単位で行い、「邪魔だから」と一括で消さない。対話で先回りして緩和を提案する必要はない。

hookの検出パターンを変更した場合は `python3 .claude/hooks/test_deny_dangerous_bash.py` を必ず実行し、緩和した挙動も「ブロックされないこと」をテストとして固定する。

### hooks とプラグイン

`hooks` はユーザーから明示的な要望（「コミット前に必ず `npm run lint` を走らせたい」等）があれば追加し、無ければ触らない。既存の `settings.json` がある場合は上書きではなくマージする。`enabledPlugins` など既存フィールドを消さない。

プラグインの目安（有効化したらStep 6で「何を・なぜ」を必ず報告する）：

- `security-guidance` / `commit-commands`（`@claude-plugins-official`）: 判断を挟まず `true`
- `frontend-design`: **React/Next.jsのUIを作る・直すこのプロジェクトでは有効化に値する**
- `context7`: Next.js・Reactはバージョン間の差異が大きい（Next 16 / React 19 など）ので基本的に有効
- `github` / `pr-review-toolkit`: GitHubでPRレビューをClaude Codeに任せる運用なら有効
- `feature-dev`: 複数ファイルにまたがる機能追加が多いなら有効。小さなサイトの微修正中心なら見送ってよい

### GitHubを使う場合: CI・依存メンテナンス・ブランチ保護

hookやセキュリティレビューは「Claude Codeのセッションの中」でしか効かない。リポジトリ側にも検査の層を作る。雛形と注意点は [references/ci-workflow.md](references/ci-workflow.md) を読んでから作業すること。

1. **`.github/workflows/ci.yml`**: Step 1で検出したコマンド（lint / 型チェック / build）から作る。検出できていないコマンドを想像で書かない。**このリポジトリのデプロイは `main` へのpushで即CodeDeployが走る**ので、CIは「mainに入れる前にビルドが通る」ことを保証する役割が大きい
2. **`.github/dependabot.yml`**: `package-ecosystem: "npm"` と `github-actions`
3. **ブランチ保護**: `main` への直push禁止とCI成功のマージ条件化を案内する（リポジトリ内のファイルでは完結しないので、案内した/できたかをStep 6で報告する）

既にCI（現状は `deploy.yml` のみ）があれば重複して作らず、不足しているジョブの追加を提案する程度にとどめる。

### `.gitignore` の整備

- 追加してよいもの: `.env` / `.env.*`（ただし `.env.example` は除外）、`.DS_Store`、`.claude/settings.local.json`（個人用ローカル設定）
- `create-next-app` が生成する `.gitignore` に `/node_modules`、`/.next/`、`.env*` などは最初から含まれているので、重複行を足す前に既存の内容を確認する

## Step 4: 雛形ファイルを作成する

Step 2 で作ると決めたものについて雛形を作成する。雛形止まりにせず、対話で分かった具体的な手順や判断基準を可能な限り書き込む。

- Command: `.claude/commands/<name>.md`（frontmatterに `description`、本文に実行手順）
- Skill: `.claude/skills/<name>/SKILL.md`（frontmatterに `name` と `description`。`description` にはトリガー条件を具体的に書く）
- Subagent: `.claude/agents/<name>.md`（frontmatterに `name`, `description`, 必要なら `tools` の絞り込み）

**デプロイ**に関わる雛形を作る場合は、手順の冒頭に「`npm run lint` と `npm run build` を実行し、失敗したら中止する」ステップを置き、「前のバージョンに戻す方法」（`safe-rollback` スキルの4-D）を明記する。

## Step 5: `CLAUDE.md` を更新する

`CLAUDE.md` に、Step 1・2で判明した内容を書く。すでに具体的な記述がある項目は上書きしない。

- **コマンド**: `npm install`（正とするパッケージマネージャを明記）/ `npm run dev` / `npm run lint` / `npm run build` / `npx tsc --noEmit`。テストが無いならその旨
- **構成**: App Router（`src/app/`）、`src/components/`、`src/lib/posts.ts` + `posts/*.md`（`gray-matter` + `remark` でブログを描画）、スタイル（Sass / Tailwind v4）
- **コンベンション**: Server / Client Component の使い分け、コミットメッセージのprefix（`feat:` 等）、画像の置き場所（`public/`）
- **デプロイ**: `main` へのpush → GitHub Actions → AWS CodeDeploy（`appspec.yml`）。mainに入れる前に必ずビルドを確認すること

コードがまだ少ない領域は無理に埋めず、分かる範囲だけ書く。

## Step 6: 変更点をまとめて提示する

作成・変更したファイルの一覧と、それぞれの狙いを短くまとめて伝える。permissionsやhooksなど動作に影響する変更は、何を許可したか明示する。Step 1で見つけたギャップ（lint/型エラー、lockfileの併存等）があれば、**このスキルの範囲外であることを明示した上で**報告する。

あわせて、同梱の運用スキルを紹介する。

- **`safe-rollback`**: 「壊れたので戻したい」と伝えれば安全な手順で復旧する
- **`go-live-checklist`**: 「公開したい」と伝えれば公開前の監査が先に走る
- **`project-health-check`**: 「健康診断して」で依存更新・セキュリティアラート・CI失敗を棚卸しする
- **`github-task-intake`**: 「issueを起票して」で観点を整理してからissueを作る
