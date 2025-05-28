import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload'

export const defaultLexical = lexicalEditor()

export const messageRichText: RichTextField = {
  name: 'message',
  type: 'richText',
  editor: defaultLexical,
}
