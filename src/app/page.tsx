import Home from "./home/Page";

// 記事は実行時に追加されるので毎回読み込む (ホームの Post 欄)
export const dynamic = "force-dynamic";

export default function Page() {
  return <Home />;
}
