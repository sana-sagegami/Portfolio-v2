"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { save, uploadBodyImage } from "../actions";
import type { PostSource } from "@/src/lib/posts";
import TagPicker from "./TagPicker";
import { renderMarkdown } from "@/src/lib/markdown";
import styles from "../admin.module.scss";
import postStyles from "../../posts/[slug]/page.module.scss";

export default function PostForm({ post, base, tagOptions }: { post?: PostSource; base: string; tagOptions: string[] }) {
  const [error, action, pending] = useActionState(save, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imgMsg, setImgMsg] = useState<string | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  const [content, setContent] = useState(post?.content ?? "");
  const previewHtml = useMemo(() => renderMarkdown(content), [content]);

  // 画像を順にアップロードして、カーソル位置に Markdown を挿入する
  async function insertImages(files: File[]) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) return;
    setImgMsg("アップロード中...");
    for (const file of images) {
      const fd = new FormData();
      fd.set("image", file);
      const res = await uploadBodyImage(fd);
      if (!res.url) return setImgMsg(res.error ?? "失敗しました");
      const ta = contentRef.current;
      if (!ta) return;
      const pos = ta.selectionStart ?? ta.value.length;
      ta.setRangeText(`\n![ここに画像の説明](${res.url})\n`, pos, ta.selectionEnd ?? pos, "end");
      setContent(ta.value);
    }
    contentRef.current?.focus();
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
      <div className={`${styles.label} ${styles.editorSplit}`}>
        <div className={styles.editorPane}>
          本文 (Markdown) — 画像はドラッグ&ドロップ / ペーストでも挿入できます。サイズ指定: ![説明](URL =300x) (幅300px) / =300x200 (幅x高さ)
          <textarea
            ref={contentRef}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onPaste={(e) => {
              const files = Array.from(e.clipboardData.files);
              if (files.some((f) => f.type.startsWith("image/"))) {
                e.preventDefault();
                void insertImages(files);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const files = Array.from(e.dataTransfer.files);
              if (files.some((f) => f.type.startsWith("image/"))) {
                e.preventDefault();
                void insertImages(files);
              }
            }}
            rows={24}
            className={styles.textarea}
          />
          <label className={styles.fileBtn}>
            画像を選んで挿入 (5MBまで)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className={styles.fileInput}
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []);
                e.target.value = "";
                await insertImages(files);
              }}
            />
          </label>
          {imgMsg && <span>{imgMsg}</span>}
        </div>
        <div className={styles.editorPane}>
          プレビュー
          <div className={styles.previewBox}>
            <div className={postStyles.postContent} dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
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
