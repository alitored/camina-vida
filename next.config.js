/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de paquetes para reducir el JS y CSS enviado
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Mejora el minificado de CSS y JS
  swcMinify: true,
};

module.exports = nextConfig;