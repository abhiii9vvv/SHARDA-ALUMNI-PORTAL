/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SHARDA-ALUMNI-PORTAL',
  assetPrefix: '/SHARDA-ALUMNI-PORTAL/',
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js', 'framer-motion'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

export default nextConfig