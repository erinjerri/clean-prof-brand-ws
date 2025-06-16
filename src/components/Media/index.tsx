'use client'

import React from 'react'
import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import type { Props } from './types'

export const Media: React.FC<Props> = (props) => {
  const { resource, ...rest } = props

  // Check if resource is a valid object with mimeType
  if (resource && typeof resource === 'object' && 'mimeType' in resource) {
    const isVideo = resource.mimeType?.includes('video')

    if (isVideo) {
      return <VideoMedia resource={resource} {...rest} />
    }
  }

  return <ImageMedia resource={resource} {...rest} />
}
