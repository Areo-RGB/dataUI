const { withNextVideo } = require("next-video/process")

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Your existing Next.js config
}

module.exports = withNextVideo(nextConfig)
