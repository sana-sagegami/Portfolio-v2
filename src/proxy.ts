import { NextRequest, NextResponse } from "next/server";
import { adminSegment } from "@/src/lib/adminPath";

// 内部ルートは /admin だが、外には ADMIN_PATH のURLだけを公開する。
// /admin への直接アクセスは存在しないものとして 404 を返す。
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = adminSegment();

  if (seg && (pathname === `/${seg}` || pathname.startsWith(`/${seg}/`))) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin" + pathname.slice(seg.length + 1);
    return NextResponse.rewrite(url);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon|.*\\..*).*)"],
};
