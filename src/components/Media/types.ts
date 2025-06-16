import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export interface MediaResource {
  url: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
  updatedAt?: string
  sizes?: {
    og?: {
      url: string
    }
  }
}

export type Props = {
  alt?: string
  className?: string
  fill?: boolean
  htmlElement?: string | null
  imgClassName?: string
  loading?: 'lazy' | 'eager'
  pictureClassName?: string
  priority?: boolean
  resource?: {
    alt?: string
    height?: number
    mimeType?: string
    url?: string
    width?: number
    updatedAt?: string
  } | null
  size?: string
  src?: string | StaticImageData
}
