import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: new URL(NEXT_PUBLIC_SERVER_URL).protocol.replace(':', ''),
        hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
      },
    ],
  },
  reactStrictMode: true,
  redirects,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
    }
    return config
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
