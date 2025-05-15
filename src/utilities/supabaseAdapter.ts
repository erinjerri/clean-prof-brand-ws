import { S3Client, PutObjectCommand, DeleteObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types';

export function supabaseAdapter({
  bucket,
  config,
}: {
  bucket: string;
  config: S3ClientConfig;
}): Adapter {
  const client = new S3Client(config);

  return {
    async upload({ filename, data }: { filename: string; data: Buffer }) {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: filename,
          Body: data,
        })
      );
      return {
        url: `${config.endpoint?.toString().replace(/\/$/, '')}/${bucket}/${filename}`,
      };
    },
    async delete({ filename }: { filename: string }) {
      await client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: filename,
        })
      );
      return {};
    },
  } as Adapter;
}