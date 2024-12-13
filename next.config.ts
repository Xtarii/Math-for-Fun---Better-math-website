import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "/Math-for-Fun---Better-math-website" : "",
  // output: "export",
  reactStrictMode: true
};

export default nextConfig;
