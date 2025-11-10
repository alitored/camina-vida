/** @type {import("next").NextConfig} */
const nextConfig = {
  appDir: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
