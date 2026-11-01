import Link from "next/link";
import { getAllPosts } from "@/src/lib/posts";
import { adminBase } from "@/src/lib/adminPath";
import { isAdmin } from "@/src/lib/auth";
import PostCard from "./components/PostCard";
import styles from "./page.module.scss";

export const metadata = {
  title: "Post | Sana's Portfolio",
};

// 記事は実行時に追加されるので毎回読み込む
export const dynamic = "force-dynamic";

export default async function PostPage() {
  const admin = await isAdmin();
  const posts = getAllPosts(admin);

  return (
    <main className={styles.blogMain}>
      <div className={styles.blogHeader}>
        <h1 className={styles.blogTitle}>Post</h1>
        {admin && (
          <Link href={adminBase()} className={styles.adminLink}>
            ✎ 記事を書く
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className={styles.empty}>まだ記事がありません。</p>
      ) : (
        <ul className={styles.postGrid}>
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
