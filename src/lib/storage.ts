import crypto from "crypto";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { UPLOAD_TYPES, UPLOAD_MAX, saveUpload, deleteUpload } from "./posts";

// Cloudflare R2 (S3互換) の設定が全部そろっていれば R2 に保存し、
// なければ従来どおりサーバーのディスク(POSTS_DIR/uploads)に保存する。
function r2() {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_URL } =
    process.env;
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET || !R2_PUBLIC_URL) {
    return null;
  }
  return {
    bucket: R2_BUCKET,
    publicUrl: R2_PUBLIC_URL.replace(/\/+$/, ""),
    client: new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
    }),
  };
}

const PREFIX = "post-thumbnails/";

export async function storeImage(file: File): Promise<string> {
  const cfg = r2();
  if (!cfg) return saveUpload(file);

  const ext = UPLOAD_TYPES[file.type];
  if (!ext) throw new Error("画像は JPEG / PNG / WebP / GIF のみ使えます");
  if (file.size > UPLOAD_MAX) throw new Error("画像は5MB以下にしてください");

  const key = `${PREFIX}${crypto.randomBytes(12).toString("hex")}.${ext}`;
  try {
    await cfg.client.send(
      new PutObjectCommand({
        Bucket: cfg.bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (e) {
    console.error("R2 upload failed", e);
    throw new Error("R2への画像アップロードに失敗しました (設定を確認してください)");
  }
  return `${cfg.publicUrl}/${key}`;
}

export async function removeImage(url: string) {
  if (!url) return;
  if (url.startsWith("/uploads/")) return deleteUpload(url);

  const cfg = r2();
  if (!cfg || !url.startsWith(`${cfg.publicUrl}/${PREFIX}`)) return; // 自分のバケット以外は触らない
  const key = url.slice(cfg.publicUrl.length + 1);
  try {
    await cfg.client.send(new DeleteObjectCommand({ Bucket: cfg.bucket, Key: key }));
  } catch (e) {
    console.error("R2 delete failed", e);
  }
}
