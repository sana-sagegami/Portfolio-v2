import fs from "fs";
import path from "path";
import { uploadsDir, UPLOAD_NAME_RE, UPLOAD_MIME } from "@/src/lib/posts";

// アップロード画像の配信 (実行時に増えるファイルなので public/ ではなくここから返す)
export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!UPLOAD_NAME_RE.test(file)) return new Response("Not Found", { status: 404 });
  const p = path.join(uploadsDir(), file);
  if (!fs.existsSync(p)) return new Response("Not Found", { status: 404 });
  return new Response(fs.readFileSync(p), {
    headers: {
      "Content-Type": UPLOAD_MIME[file.split(".")[1]],
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
