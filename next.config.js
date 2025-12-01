/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  output: 'standalone', // For Docker deployments
  images: {
    domains: [],
  },
  // Turbopack is enabled only when ENABLE_TURBOPACK is '1' (e.g., local dev)
  // On CI builds or production we default to webpack to avoid Turbopack-
  // specific native binding issues on some architectures (arm/v7).
  turbopack: process.env.ENABLE_TURBOPACK === '1'
    ? {
        resolveAlias: {
          '@assets': './attached_assets',
        },
      }
    : undefined,
}

export default nextConfig