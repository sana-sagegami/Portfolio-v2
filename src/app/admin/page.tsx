import Link from "next/link";
import { redirect } from "next/navigation";
import { adminBase } from "@/src/lib/adminPath";
import { isAdmin } from "@/src/lib/auth";
import { getAllPosts } from "@/src/lib/posts";
import { logout, remove } from "./actions";
import styles from "./admin.module.scss";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect(`${adminBase()}/login`);
  const posts = getAllPosts(true);
  const base = adminBase();

  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.title}>Posts</h1>
          <div className={styles.row}>
            <Link href={`${base}/new`} className={styles.primaryBtn}>＋ New post</Link>
            <form action={logout}>
              <button className={styles.ghostBtn}>Logout</button>
            </form>
          </div>
        </div>

        {posts.length === 0 && <p className={styles.muted}>まだ記事がありません。</p>}
        <ul className={styles.list}>
          {posts.map((p) => (
            <li key={p.slug} className={styles.listItem}>
              <div>
                <span className={p.published ? styles.badgePub : styles.badgeDraft}>
                  {p.published ? "公開" : "下書き"}
                </span>
                <span className={styles.muted}> {p.date}</span>
                <p className={styles.itemTitle}>{p.title}</p>
              </div>
              <div className={styles.row}>
                <Link href={`${base}/${p.slug}`} className={styles.ghostBtn}>編集</Link>
                <form action={remove}>
                  <input type="hidden" name="slug" value={p.slug} />
                  <button className={styles.dangerBtn}>削除</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
