/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  reactProductionProfiling: false,
  images: {
    domains: [],
  },
  transpilePackages: ['neurelo-sdk'],
};

module.exports = nextConfig;
