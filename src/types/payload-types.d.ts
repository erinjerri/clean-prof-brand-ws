declare module '@/payload-types' {
  export interface Post {
    id: string
    slug: string
    title: string
    heroImage?: Media
    meta?: {
      title?: string
      description?: string
      image?: Media
    }
    categories?: Array<{
      id: string
      title: string
    }>
  }

  export interface Media {
    id: string
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

  export interface Config {
    db: {
      defaultIDType: string
    }
  }

  export interface Page {
    hero?: {
      type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'
      links?: Array<{
        link: {
          type: string
          label: string
          url: string
        }
      }>
      media?: Media
      richText?: any
    }
  }
}
