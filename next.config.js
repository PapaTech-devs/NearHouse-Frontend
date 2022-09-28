/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/regions",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/regions`,
      },
    ]
  },
}

module.exports = nextConfig
