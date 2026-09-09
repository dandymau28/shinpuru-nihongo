import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static `out/` folder that any
  // web server (nginx, Caddy, …) can serve directly — no Node runtime.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
