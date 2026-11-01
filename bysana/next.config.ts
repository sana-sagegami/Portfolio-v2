import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 管理画面からの画像アップロード(5MB)を通すため
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
