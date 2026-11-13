"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, isAdmin } from "@/src/lib/auth";
import { adminBase } from "@/src/lib/adminPath";
import { storeImage, removeImage } from "@/src/lib/storage";
import { isLocked, recordFail, reset } from "@/src/lib/loginThrottle";
import { SLUG_RE, savePost, deletePost, getPostSource, } from "@/src/lib/posts";
import { commitPost, deletePostCommit } from "@/src/lib/github";

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

  const body = savePost({
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
  const renamed = originalSlug && originalSlug !== slug && SLUG_RE.test(originalSlug);
  if (renamed) deletePost(originalSlug);

  // GitHub に自動コミット (GITHUB_TOKEN 未設定なら何もしない)
  try {
    await commitPost(slug, body, `post: ${originalSlug ? "update" : "add"} ${slug}`);
    if (renamed) await deletePostCommit(originalSlug, `post: rename ${originalSlug} -> ${slug}`);
  } catch (e) {
    revalidatePath("/posts");
    console.error("GitHub commit failed", e);
    return `保存はできましたが、GitHubへの反映に失敗しました: ${e instanceof Error ? e.message : ""}`;
  }

  revalidatePath("/posts");
  redirect(adminBase());
}

export async function uploadBodyImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  if (!(await isAdmin())) return { error: "ログインが必要です" };
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return { error: "画像を選択してください" };
  try {
    return { url: await storeImage(file) };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "画像の保存に失敗しました" };
  }
}

export async function remove(formData: FormData) {
  if (!(await isAdmin())) redirect(`${adminBase()}/login`);
  const slug = String(formData.get("slug") ?? "");
  const src = getPostSource(slug);
  deletePost(slug);
  try {
    await deletePostCommit(slug, `post: delete ${slug}`);
  } catch (e) {
    console.error("GitHub delete commit failed", e);
  }
  if (src?.thumbnail) await removeImage(src.thumbnail);
  // 本文中の画像も削除 (removeImage は自分の保存先以外は触らない)
  for (const m of (src?.content ?? "").matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)/g)) await removeImage(m[1]);
  revalidatePath("/posts");
  redirect(adminBase());
}
