import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/src/lib/posts";
import { adminBase } from "@/src/lib/adminPath";
import { isAdmin } from "@/src/lib/auth";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, await isAdmin()).catch(() => null);
  if (!post) return {};
  return { title: `${post.title} | Post` };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const admin = await isAdmin();
  const post = await getPostBySlug(slug, admin).catch(() => null);

  if (!post) notFound();

  return (
    <main className={styles.postMain}>
      <div className={styles.postContainer}>
        <Link href="/post" className={styles.backLink}>
          ← Post一覧へ
        </Link>
        {admin && (
          <Link href={`${adminBase()}/${post.slug}`} className={styles.backLink} style={{ marginLeft: "1.5rem" }}>
            ✎ 編集
          </Link>
        )}

        <article>
          {post.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.thumbnail} alt="" className={styles.thumbnail} />
          )}
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
