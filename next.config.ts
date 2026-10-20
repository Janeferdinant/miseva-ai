import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "C:/Users/Asus/Documents",
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
