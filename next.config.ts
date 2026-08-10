import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/UniCal-portfolio" : "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
