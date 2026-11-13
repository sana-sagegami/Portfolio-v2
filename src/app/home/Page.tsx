import { getAllPosts } from "@/src/lib/posts";
import HomePage from "./HomePage";

// ホームに出す最新記事の件数 (新しい順。超えた分は Post一覧 で見られる)
const LATEST_COUNT = 2;

export default function Home() {
  const latestPosts = getAllPosts().slice(0, LATEST_COUNT);
  return <HomePage latestPosts={latestPosts} />;
}
