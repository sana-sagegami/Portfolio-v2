// 最初から選べるタグ。ここに足せば選択肢が増える
export const PRESET_TAGS = [
  "シス研",
  "研究室",
  "雑記",
  "制作",
  "開発",
  "技術メモ",
  "インターン",
  "就活",
  "日記",
];

import { getAllPosts } from "./posts";

// プリセット + 過去の記事で使ったタグ
export function tagOptions(): string[] {
  const used = getAllPosts(true).flatMap((p) => p.tags ?? []);
  return [...new Set([...PRESET_TAGS, ...used])];
}
