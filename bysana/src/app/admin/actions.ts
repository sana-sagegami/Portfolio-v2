"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, isAdmin } from "@/src/lib/auth";
import { adminBase } from "@/src/lib/adminPath";
import { storeImage, removeImage } from "@/src/lib/storage";
import { isLocked, recordFail, reset } from "@/src/lib/loginThrottle";
import { SLUG_RE, savePost, deletePost, getPostSource, } from "@/src/lib/posts";

export async function login(_: string | null, formData: FormData) {
  if (isLocked()) return "試行回数が多すぎます。しばらくしてからやり直してください";
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    recordFail();
    return "パスワードが違います";
  }
  reset();
  await createSession();
  redirect(adminBase());
}

export async function logout() {
  await destroySession();
  redirect(`${adminBase()}/login`);
}

export async function save(_: string | null, formData: FormData) {
  if (!(await isAdmin())) redirect(`${adminBase()}/login`);

  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const originalSlug = String(formData.get("originalSlug") ?? "");

  if (!SLUG_RE.test(slug)) return "URL名は半角英小文字・数字・ハイフンのみ使えます (例: my-first-post)";
  if (!title) return "タイトルを入力してください";
  if (slug !== originalSlug && getPostSource(slug)) return "そのURL名は既に使われています";

  // サムネイル: 新規アップロード > 削除指定 > 既存を維持
  const old = originalSlug ? getPostSource(originalSlug)?.thumbnail ?? "" : "";
  let thumbnail = old;
  const file = formData.get("thumbnail");
  if (file instanceof File && file.size > 0) {
    try {
      thumbnail = await storeImage(file);
    } catch (e) {
      return e instanceof Error ? e.message : "画像の保存に失敗しました";
    }
  } else if (formData.get("removeThumbnail") === "on") {
    thumbnail = "";
  }
  if (old && old !== thumbnail) await removeImage(old);

  savePost({
    thumbnail,
    slug,
    title,
    date: String(formData.get("date") ?? "") || new Date().toISOString().slice(0, 10),
    description: String(formData.get("description") ?? "").trim(),
    tags: String(formData.get("tags") ?? "")
      .split(/[,、]/)
      .map((t) => t.trim())
      .filter(Boolean),
    published: formData.get("published") === "on",
    content: String(formData.get("content") ?? ""),
  });
  if (originalSlug && originalSlug !== slug && SLUG_RE.test(originalSlug)) deletePost(originalSlug);

  revalidatePath("/posts");
  redirect(adminBase());
}

export async function remove(formData: FormData) {
  if (!(await isAdmin())) redirect(`${adminBase()}/login`);
  const slug = String(formData.get("slug") ?? "");
  const thumb = getPostSource(slug)?.thumbnail;
  deletePost(slug);
  if (thumb) await removeImage(thumb);
  revalidatePath("/posts");
  redirect(adminBase());
}
