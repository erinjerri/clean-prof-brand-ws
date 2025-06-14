/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  webpack: (config, { isServer }) => {
    // ESM packages that need to be treated as commonjs on server
    config.externals = config.externals || []
    if (isServer) {
      config.externals.push({
        '@payloadcms/db-mongodb': 'commonjs @payloadcms/db-mongodb',
        '@payloadcms/plugin-seo': 'commonjs @payloadcms/plugin-seo',
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

    return config
  },
  transpilePackages: ['@payloadcms/plugin-seo'],
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig
