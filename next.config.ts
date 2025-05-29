import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-todo-app/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/my-todo-app' : '',
};

export default nextConfig;
