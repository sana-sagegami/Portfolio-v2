"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { save } from "../actions";
import type { PostSource } from "@/src/lib/posts";
import TagPicker from "./TagPicker";
import styles from "../admin.module.scss";

export default function PostForm({ post, base, tagOptions }: { post?: PostSource; base: string; tagOptions: string[] }) {
  const [error, action, pending] = useActionState(save, null);
  const [preview, setPreview] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className={styles.form}>
      <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />
      <label className={styles.label}>タイトル
        <input name="title" defaultValue={post?.title} required className={styles.input} />
      </label>
      <label className={styles.label}>URL名 (半角英数とハイフン)
        <input name="slug" defaultValue={post?.slug} required placeholder="my-first-post" className={styles.input} />
      </label>
      <label className={styles.label}>日付
        <input type="date" name="date" defaultValue={post?.date || today} className={styles.input} />
      </label>
      <label className={styles.label}>概要 (カードに表示)
        <input name="description" defaultValue={post?.description} className={styles.input} />
      </label>
      <div className={styles.label}>
        サムネイル画像 (カードに表示 / 5MBまで)
        {(preview || post?.thumbnail) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview ?? post?.thumbnail} alt="" className={styles.thumbPreview} />
        )}
        <label className={styles.fileBtn}>
          {preview ? "画像を選び直す" : post?.thumbnail ? "画像を差し替える" : "画像を選択"}
          <input
            type="file"
            name="thumbnail"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className={styles.fileInput}
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
          />
        </label>
        {post?.thumbnail && (
          <label className={styles.check}>
            <input type="checkbox" name="removeThumbnail" />
            今の画像を削除する
          </label>
        )}
      </div>
      <TagPicker options={tagOptions} initial={post?.tags ?? []} />
      <label className={styles.label}>本文 (Markdown)
        <textarea name="content" defaultValue={post?.content} rows={18} className={styles.textarea} />
      </label>
      <label className={styles.check}>
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} />
        公開する (オフ = 下書き。自分だけに見えます)
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.row}>
        <button type="submit" disabled={pending} className={styles.primaryBtn}>
          {pending ? "保存中..." : "保存"}
        </button>
        <Link href={base} className={styles.ghostBtn}>戻る</Link>
      </div>
    </form>
  );
}
