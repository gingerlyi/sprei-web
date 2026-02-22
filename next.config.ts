import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Naikkan batas upload menjadi 5 MB
    },
  },
};

export default nextConfig;