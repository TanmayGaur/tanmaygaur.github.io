import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/tanmaygaur.github.io',
  images: {
    unoptimized: true,
  },
};
// console.log('NODE_ENV:', process.env.NODE_ENV);

export default nextConfig;