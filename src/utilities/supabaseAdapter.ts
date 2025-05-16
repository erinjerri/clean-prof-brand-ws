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

  return function supabaseAdapterInstance({ prefix }: { prefix?: string }) {
    return {
      async upload({ file }: { file: { filename: string; data: Buffer } }) {
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

      async delete({ filename }: { filename: string }) {
        const { error } = await client.storage.from(bucket).remove([filename])
        if (error) throw error
        return {}
      },

      generateURL({ filename }: { filename: string }) {
        return `${supabaseURL}/storage/v1/object/public/${bucket}/${filename}`
      },
    }
  }
}