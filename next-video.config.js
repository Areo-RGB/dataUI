/** @type {import('next-video').Options} */
module.exports = {
  provider: "mux",
  providerConfig: {
    // Mux configuration is automatically loaded from environment variables
    // MUX_TOKEN_ID and MUX_TOKEN_SECRET
  },
  storage: {
    // You can customize storage options here if needed
  },
  output: {
    // Output directory for processed videos
    directory: "public/videos",
  },
  experimental: {
    // Enable experimental features
    newNextLinkBehavior: true,
  },
}
