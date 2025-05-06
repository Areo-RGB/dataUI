/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable any experimental features
  experimental: {
    // Disable any experimental features that might be enabled
    serverActions: false,
    serverComponents: false,
  },
}

module.exports = nextConfig
