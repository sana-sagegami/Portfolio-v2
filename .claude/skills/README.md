# Skills

このディレクトリには、このリポジトリ（Next.js / React ポートフォリオ）専用のClaude Codeスキル（`SKILL.md`）を置く。各スキルはサブディレクトリとして配置し、`<skill-name>/SKILL.md` にfrontmatter（`name`, `description`）と手順を記述する。

元は `kakureru`（Flutterアプリ）の `.claude/skills` で、Next.js/Reactの構成・AWS CodeDeployによるデプロイに合わせて書き換えたもの。

## 一覧

| スキル | 概要 |
|---|---|
| [claude-project-setup](claude-project-setup/SKILL.md) | `.claude/`環境（権限・hooks・プラグイン設定、CLAUDE.md、CI・Dependabot・ブランチ保護）を対話形式でセットアップ・見直しする。 |
| [safe-rollback](safe-rollback/SKILL.md) | 「壊れた」「元に戻したい」ときの復旧ワークフロー。破壊的コマンドを使わず、退避→切り分け→revert/切り戻しの順で回復する。mainへのpushが即本番反映なので、CodeDeployの切り戻しにも対応。 |
| [go-live-checklist](go-live-checklist/SKILL.md) | 公開・リリース前の監査。秘密情報（`NEXT_PUBLIC_`の漏れ含む）・認証認可・露出面を棚卸しして `/security-review` まで実行。 |
| [project-health-check](project-health-check/SKILL.md) | 「健康診断して」で発動する定期点検。Dependabot PR・セキュリティアラート・CI/デプロイ失敗・`npm audit`・lint/型/buildを棚卸しして優先度付きで報告。 |
| [github-task-intake](github-task-intake/SKILL.md) | 「issueを起票して」で発動。Engineer/PM/PO/Designerの観点で理解を深めてからGitHub Issueを作成する。 |

## 移植しなかったもの

- `night-run-hearing` / `night-run-status`: kakureruの `night-run/`（夜間自律実行の仕組み）が前提。このリポジトリには無い
- `ui-mockup-reference`: kakureru固有のモック（`docs/ui-mockup-2a.html`）が前提。このサイト用のモックができたら同じ形で作れる
- `settings.local.json`: kakureru固有のFirebase/Flutter向け許可リストで、APIキーも含むため持ち込まない

新しいスキルを追加したら、この表にも1行追記すること。frontmatterの `description` は全スキル分が毎セッションのコンテキストに常時読み込まれるので、トリガー条件に絞って書き、手順は本文に書くこと。
