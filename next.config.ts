import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/:lang(vi|en)/learning/statistics/03-conditional-bayes", destination: "/:lang/learning/statistics/04-conditional-bayes", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/04-random-variables", destination: "/:lang/learning/statistics/05-random-variables", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/05-binomial-poisson", destination: "/:lang/learning/statistics/06-binomial-poisson", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/06-normal", destination: "/:lang/learning/statistics/08-normal", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/07-lln-clt", destination: "/:lang/learning/statistics/10-lln-clt", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/08-confidence-intervals", destination: "/:lang/learning/statistics/14-confidence-intervals", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/09-hypothesis-testing", destination: "/:lang/learning/statistics/16-hypothesis-testing", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/10-regression", destination: "/:lang/learning/statistics/23-regression", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/11-pitfalls", destination: "/:lang/learning/statistics/29-pitfalls", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/12-derivatives", destination: "/:lang/learning/statistics/30-derivatives", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/13-optimisation", destination: "/:lang/learning/statistics/31-optimisation", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/14-integrals", destination: "/:lang/learning/statistics/32-integrals", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/15-vectors-matrices", destination: "/:lang/learning/statistics/36-vectors-matrices", permanent: true },
      { source: "/:lang(vi|en)/learning/statistics/16-eigen-pca", destination: "/:lang/learning/statistics/38-eigen-pca", permanent: true },
      { source: "/:lang(vi|en)/learning/programming/courses/sql/15-project-sales-analysis", destination: "/:lang/learning/programming/courses/sql/40-project-sales-analysis", permanent: true },
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
