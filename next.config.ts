import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_TARGET === "export" ? "export" : undefined,
  basePath: process.env.BUILD_TARGET === "export" ? "/LearningEnglish" : "",
  // When exporting, images optimization is not supported unless unoptimized is true
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
