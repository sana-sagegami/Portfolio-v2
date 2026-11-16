// ログイン失敗の簡易レート制限 (メモリ内。5回失敗で15分ロック)
const MAX = 5;
const WINDOW = 15 * 60 * 1000;
let fails: number[] = [];

export function isLocked() {
  const now = Date.now();
  fails = fails.filter((t) => now - t < WINDOW);
  return fails.length >= MAX;
}
export function recordFail() { fails.push(Date.now()); }
export function reset() { fails = []; }
