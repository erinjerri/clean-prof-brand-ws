import { buildConfig, PayloadRequest } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { s3Storage } from '@payloadcms/storage-s3';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { supabaseAdapter } from '@/utilities/supabaseAdapter';
// import configPromise from '../payload.config';

import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Users } from './collections/Users';
import { Footer } from './Footer/config';
import { Header } from './Header/config';
import { plugins } from './plugins';
import { defaultLexical } from './fields/defaultLexical';
import { getServerSideURL } from './utilities/getURL';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3 = supabaseAdapter({
  config: {
    endpoint: process.env.S3_ENDPOINT || '',
    region: process.env.S3_REGION || '',
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
  },
  bucket: process.env.S3_BUCKET || '',
});

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['./components/BeforeLogin'],
      beforeDashboard: ['./components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    s3Storage({
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        region: process.env.S3_REGION || '',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      collections: {
        media: {},
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true;
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
