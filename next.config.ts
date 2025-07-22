/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    // Remove or comment out optimizeCss for now
    // optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig