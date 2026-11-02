"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { save, uploadBodyImage } from "../actions";
import type { PostSource } from "@/src/lib/posts";
import TagPicker from "./TagPicker";
import styles from "../admin.module.scss";

export default function PostForm({ post, base, tagOptions }: { post?: PostSource; base: string; tagOptions: string[] }) {
  const [error, action, pending] = useActionState(save, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imgMsg, setImgMsg] = useState<string | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function insertImage(file: File) {
    setImgMsg("アップロード中...");
    const fd = new FormData();
    fd.set("image", file);
    const res = await uploadBodyImage(fd);
    if (!res.url) return setImgMsg(res.error ?? "失敗しました");
    const ta = contentRef.current;
    if (ta) {
      const md = `\n![ここに画像の説明](${res.url})\n`;
      const pos = ta.selectionStart ?? ta.value.length;
      ta.setRangeText(md, pos, ta.selectionEnd ?? pos, "end");
      ta.focus();
    }
    setImgMsg("挿入しました");
  }

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
        <textarea ref={contentRef} name="content" defaultValue={post?.content} rows={18} className={styles.textarea} />
      </label>
      <div className={styles.label}>
        <label className={styles.fileBtn}>
          本文に画像を挿入 (カーソル位置 / 5MBまで。[ ]内の文章が画像の下に表示されます)
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className={styles.fileInput}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) await insertImage(f);
            }}
          />
        </label>
        {imgMsg && <span>{imgMsg}</span>}
      </div>
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
