/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['payload'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'anotherdomain.com',
        port: '',
        pathname: '/**',
      },
      // Add more as needed
    ],
    // Increase image optimization timeout
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  transpilePackages: ['@payloadcms/plugin-seo', '@payloadcms/plugin-search', '@payloadcms/ui'],
  webpack: (config, { isServer }) => {
    // ESM packages that need to be treated as commonjs on server
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        '@payloadcms/db-mongodb': 'commonjs @payloadcms/db-mongodb',
        '@payloadcms/plugin-seo': 'commonjs @payloadcms/plugin-seo',
        '@payloadcms/plugin-search': 'commonjs @payloadcms/plugin-search',
        '@payloadcms/ui': 'commonjs @payloadcms/ui',
        payload: 'commonjs payload',
      })
    }

    // Support .mjs files from ESM modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    // Extension resolution
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Custom alias for payload.config.ts
    config.resolve.alias['payload-config'] = path.resolve(__dirname, './src/payload.config.ts')
    config.resolve.alias['@'] = path.resolve(__dirname, './src')

    // Add fallback for getBestFitFromSizes
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'payload/shared': path.resolve(__dirname, './src/utilities/shared.js'),
    }

    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })

    return config
  },
}

export default nextConfig
