import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor()

import type { RichTextField } from 'payload'

export const messageRichText: RichTextField = {
  name: 'message',
  type: 'richText',
  editor: defaultLexical,
}
