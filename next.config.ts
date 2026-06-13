import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_TARGET === "export" ? "export" : undefined,
  basePath: process.env.BUILD_TARGET === "export" ? "/LearningEnglish" : "",
  // When exporting, images optimization is not supported unless unoptimized is true
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Allow all API routes to be accessed from any origin
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Can be replaced with actual GitHub Pages domain later
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  }
};

export default nextConfig;
