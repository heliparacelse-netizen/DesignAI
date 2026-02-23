/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL || 'https://design-ai-rouge.vercel.app',
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
