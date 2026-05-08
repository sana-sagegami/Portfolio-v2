import Link from "next/link";
import { getAllPosts } from "@/src/lib/posts";
import styles from "./page.module.scss";

export const metadata = {
  title: "Blog | Sana's Portfolio",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className={styles.blogMain}>
      <div className={styles.blogHeader}>
        <h1 className={styles.blogTitle}>Blog</h1>
      </div>

      {posts.length === 0 ? (
        <p className={styles.empty}>まだ記事がありません。</p>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.postItem}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <time className={styles.postDate}>{post.date}</time>
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
