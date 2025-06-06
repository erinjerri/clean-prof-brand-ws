import type { CollectionConfig } from 'payload'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
    },
    {
      name: 'to',
      type: 'text',
      required: true,
    },
    {
      name: 'statusCode',
      type: 'number',
      required: true,
      defaultValue: 301,
    },
  ],
  access: {
    read: () => true,
  },
}
