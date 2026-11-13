// 管理画面で保存・削除した記事を GitHub に自動コミットする。
// GITHUB_TOKEN が設定されていなければ何もしない(ローカル開発やトークン未設定時はこれまでどおり)。
//
// 必要な環境変数:
//   GITHUB_TOKEN       … Fine-grained token (このリポジトリだけ / Contents: Read and write)
//   GITHUB_REPO        … 例: sana-sagegami/portfolio-v2
//   GITHUB_BRANCH      … 省略時 main
//   GITHUB_POSTS_PATH  … 省略時 posts

const API = "https://api.github.com";

function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return null;
  return {
    token,
    repo,
    branch: process.env.GITHUB_BRANCH || "main",
    dir: (process.env.GITHUB_POSTS_PATH || "posts").replace(/^\/+|\/+$/g, ""),
  };
}

export function githubSyncEnabled() {
  return cfg() !== null;
}

async function gh(path: string, init: RequestInit = {}) {
  const c = cfg()!;
  return fetch(`${API}/repos/${c.repo}/contents/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${c.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

// 既存ファイルの sha を取る(無ければ null)。更新・削除に必要。
async function getSha(path: string): Promise<string | null> {
  const c = cfg()!;
  const res = await gh(`${path}?ref=${encodeURIComponent(c.branch)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub: ファイル情報の取得に失敗しました (${res.status})`);
  const json = (await res.json()) as { sha?: string };
  return json.sha ?? null;
}

/** 記事ファイルを作成/更新してコミット */
export async function commitPost(slug: string, body: string, message: string) {
  const c = cfg();
  if (!c) return;
  const path = `${c.dir}/${slug}.md`;
  const sha = await getSha(path);
  const res = await gh(path, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(body, "utf8").toString("base64"),
      branch: c.branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) throw new Error(`GitHub: コミットに失敗しました (${res.status})`);
}

/** 記事ファイルを削除してコミット(無ければ何もしない) */
export async function deletePostCommit(slug: string, message: string) {
  const c = cfg();
  if (!c) return;
  const path = `${c.dir}/${slug}.md`;
  const sha = await getSha(path);
  if (!sha) return;
  const res = await gh(path, {
    method: "DELETE",
    body: JSON.stringify({ message, sha, branch: c.branch }),
  });
  if (!res.ok) throw new Error(`GitHub: 削除のコミットに失敗しました (${res.status})`);
}
