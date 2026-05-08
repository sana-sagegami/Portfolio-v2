import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/src/lib/posts";
import styles from "./page.module.scss";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return { title: `${post.title} | Blog` };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  return (
    <main className={styles.postMain}>
      <div className={styles.postContainer}>
        <Link href="/blog" className={styles.backLink}>
          ← Blog一覧へ
        </Link>

        <article>
          <header className={styles.postHeader}>
            <time className={styles.postDate}>{post.date}</time>
            <h1 className={styles.postTitle}>{post.title}</h1>
            {post.tags && post.tags.length > 0 && (
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </main>
  );
}
