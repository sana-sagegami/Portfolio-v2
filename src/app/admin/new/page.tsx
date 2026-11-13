import { redirect } from "next/navigation";
import { adminBase } from "@/src/lib/adminPath";
import { isAdmin } from "@/src/lib/auth";
import { tagOptions } from "@/src/lib/tags";
import PostForm from "../components/PostForm";
import styles from "../admin.module.scss";

export default async function NewPostPage() {
  if (!(await isAdmin())) redirect(`${adminBase()}/login`);
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>New post</h1>
        <PostForm base={adminBase()} tagOptions={tagOptions()} />
      </div>
    </main>
  );
}
