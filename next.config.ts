import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: process.env.VERCEL
    ? undefined
    : {
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
