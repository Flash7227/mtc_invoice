/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + '/:path*' // Proxy to Backend
      }
    ]
  }
};

export default nextConfig;
