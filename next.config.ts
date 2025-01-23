import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PORT: process.env.NEXT_PORT,
  },
};

export default nextConfig;
