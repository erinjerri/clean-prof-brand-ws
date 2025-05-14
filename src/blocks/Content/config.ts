import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'half',
    label: 'Column Width',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full Width',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    label: 'Text Content',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    label: 'Optional Media Asset',
    required: false,
    admin: {
      condition: () => true, // always show
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Include Link?',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Content Columns',
    plural: 'Content Columns',
  },
  fields: [
    {
      name: 'columns',
      label: 'Columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      required: false,
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light Gray', value: 'gray' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'padding',
      type: 'checkbox',
      label: 'Enable Section Padding?',
      defaultValue: true,
    },
  ],
}