import Link from "next/link";
import type { PostMeta } from "@/src/lib/posts";
import styles from "../page.module.scss";

// 窓型(アーチ)カード。/post と ホームで共通
export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/post/${post.slug}`} className={styles.windowCard}>
      {!post.published && <span className={styles.draft}>下書き</span>}
      <div className={styles.arch}>
        {post.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.thumbnail} alt="" className={styles.archImg} />
        )}
        <time className={styles.postDate}>{post.date}</time>
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        {post.description && (
          <p className={styles.postDescription}>{post.description}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className={styles.postTags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
