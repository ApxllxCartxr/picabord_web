/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: [],
  },
  turbopack: {
    resolveAlias: {
      '@assets': './attached_assets',
    },
  },
}

export default nextConfig