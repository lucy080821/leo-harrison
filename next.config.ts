import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/:lang(vi|en)/learning/programming/courses/prob-stats", destination: "/:lang/learning/statistics", permanent: true },
      { source: "/:lang(vi|en)/learning/programming/courses/prob-stats/:lesson", destination: "/:lang/learning/statistics/:lesson", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
