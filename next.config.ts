import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

