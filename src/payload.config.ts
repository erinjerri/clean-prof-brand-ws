import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Footer } from './footer/config'
import { Redirects } from './collections/Redirects'
import type { GlobalConfig } from 'payload'
import sharp from 'sharp' // ✅ Required for image resizing

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    // Define your fields here
  ],
}

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      // Add any custom admin components here
    },
  },
  collections: [Pages, Posts, Media, Users, Categories, Redirects],
  globals: [Header, Footer],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      generateTitle: ({ doc }: { doc: any }) => `${doc.title} | Your Site Name`,
      generateDescription: ({ doc }: { doc: any }) => doc.content || '',
    }),
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
  sharp, // ✅ Add this line here to enable image resizing
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  secret: process.env.PAYLOAD_SECRET!,
})
