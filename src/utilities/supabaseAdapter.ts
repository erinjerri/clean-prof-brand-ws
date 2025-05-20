// src/utilities/supabaseAdapter.ts

import { createClient } from '@supabase/supabase-js'

type SupabaseAdapterArgs = {
  supabaseURL: string
  serviceRoleKey: string
  bucket: string
}

export function supabaseAdapter({
  supabaseURL,
  serviceRoleKey,
  bucket,
}: SupabaseAdapterArgs): any {
  const client = createClient(supabaseURL, serviceRoleKey)

  return {
    async upload({ file, prefix }: { file: { filename: string; data: Buffer }, prefix?: string }) {
      const { filename, data } = file
      const path = prefix ? `${prefix}/${filename}` : filename

      const { error } = await client.storage.from(bucket).upload(path, data, {
        upsert: true,
      })

      if (error) throw error

      return {
        url: `${supabaseURL}/storage/v1/object/public/${bucket}/${path}`,
      }
    },

    async delete({ filename, prefix }: { filename: string, prefix?: string }) {
      const path = prefix ? `${prefix}/${filename}` : filename
      const { error } = await client.storage.from(bucket).remove([path])
      if (error) throw error
      return {}
    },

    generateURL({ filename, prefix }: { filename: string, prefix?: string }) {
      const path = prefix ? `${prefix}/${filename}` : filename
      return `${supabaseURL}/storage/v1/object/public/${bucket}/${path}`
    },
  }
}