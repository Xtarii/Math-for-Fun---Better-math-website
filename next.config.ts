import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "/" : "",
};

export default nextConfig;
