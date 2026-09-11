import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF || "dev",
  },
  async rewrites() {
    return [
      {
        source: "/mentor-panel",
        destination: "/mentor-panel/index.html",
      },
    ];
  },
};

export default nextConfig;

