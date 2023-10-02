/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  output: "export",
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
