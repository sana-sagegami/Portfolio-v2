import crypto from "crypto";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 本番(Docker)では POSTS_DIR にボリュームをマウントして永続化する
const postsDirectory = process.env.POSTS_DIR
  ? path.resolve(process.env.POSTS_DIR)
  : path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  published: boolean;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export interface PostSource extends PostMeta {
  content: string;
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ensurePostsDir() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function filePath(slug: string) {
  if (!SLUG_RE.test(slug)) throw new Error("invalid slug");
  return path.join(postsDirectory, `${slug}.md`);
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    description: (data.description as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : "",
    published: data.published !== false,
  };
}

export function getAllPosts(includeDrafts = false): PostMeta[] {
  ensurePostsDir();
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md") && SLUG_RE.test(f.replace(/\.md$/, "")))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, f), "utf8"));
      return toMeta(slug, data);
    })
    .filter((p) => includeDrafts || p.published);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSource(slug: string): PostSource | null {
  if (!SLUG_RE.test(slug)) return null;
  const p = filePath(slug);
  if (!fs.existsSync(p)) return null;
  const { data, content } = matter(fs.readFileSync(p, "utf8"));
  return { ...toMeta(slug, data), content };
}

export async function getPostBySlug(slug: string, includeDrafts = false): Promise<Post | null> {
  const src = getPostSource(slug);
  if (!src || (!src.published && !includeDrafts)) return null;
  const { content, ...meta } = src;
  const processed = await remark().use(html).process(content);
  return { ...meta, contentHtml: processed.toString() };
}

export function savePost(post: PostSource) {
  ensurePostsDir();
  const { slug, content, ...meta } = post;
  const front: Record<string, unknown> = {
    title: meta.title,
    date: meta.date,
    description: meta.description ?? "",
    tags: meta.tags ?? [],
    published: meta.published,
  };
  if (meta.thumbnail) front.thumbnail = meta.thumbnail;
  const body = matter.stringify(content, front);
  fs.writeFileSync(filePath(slug), body, "utf8");
}

export function deletePost(slug: string) {
  const p = filePath(slug);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// ---- サムネイル画像 (POSTS_DIR/uploads に保存し /uploads/<file> で配信) ----
export const UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
export const UPLOAD_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};
export const UPLOAD_MAX = 5 * 1024 * 1024;
export const UPLOAD_NAME_RE = /^[a-f0-9]{24}\.(jpg|png|webp|gif)$/;

export function uploadsDir() {
  return path.join(postsDirectory, "uploads");
}

export async function saveUpload(file: File): Promise<string> {
  const ext = UPLOAD_TYPES[file.type];
  if (!ext) throw new Error("画像は JPEG / PNG / WebP / GIF のみ使えます");
  if (file.size > UPLOAD_MAX) throw new Error("画像は5MB以下にしてください");
  fs.mkdirSync(uploadsDir(), { recursive: true });
  const name = `${crypto.randomBytes(12).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(uploadsDir(), name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

export function deleteUpload(url: string) {
  const name = url.replace(/^\/uploads\//, "");
  if (!UPLOAD_NAME_RE.test(name)) return;
  const p = path.join(uploadsDir(), name);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}
