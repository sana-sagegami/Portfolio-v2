import { notFound, redirect } from "next/navigation";
import { adminBase } from "@/src/lib/adminPath";
import { isAdmin } from "@/src/lib/auth";
import { getPostSource } from "@/src/lib/posts";
import { tagOptions } from "@/src/lib/tags";
import PostForm from "../components/PostForm";
import styles from "../admin.module.scss";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) redirect(`${adminBase()}/login`);
  const { slug } = await params;
  const post = getPostSource(slug);
  if (!post) notFound();
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Edit post</h1>
        <PostForm post={post} base={adminBase()} tagOptions={tagOptions()} />
      </div>
    </main>
  );
}
