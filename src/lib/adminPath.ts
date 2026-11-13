// 管理画面の公開URL。環境変数 ADMIN_PATH で決める (例: ADMIN_PATH=sana-k7x2q9)
// 本番で未設定なら管理画面は存在しない扱い(404)。開発時のみ "admin" を使う。
export function adminSegment(): string {
  const v = (process.env.ADMIN_PATH ?? "").replace(/^\/+|\/+$/g, "");
  if (v) return v;
  return process.env.NODE_ENV === "production" ? "" : "admin";
}

export function adminBase(): string {
  return `/${adminSegment()}`;
}
