import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.opititechgeolabs.com",
      },
      {
        protocol: "http",
        hostname: "192.168.0.69",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
