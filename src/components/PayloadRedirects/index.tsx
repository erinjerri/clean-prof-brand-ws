import type React from 'react'
import type { Page, Post } from '../../payload-types'

import { getCachedDocument } from '../../utilities/getDocument'
import { getCachedRedirects } from '../../utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem && typeof redirectItem.to === 'object' && redirectItem.to !== null) {
    const to: any = redirectItem.to
    if ('url' in to && typeof to.url === 'string') {
      redirect(to.url)
    }
    let redirectUrl: string = ''
    if ('reference' in to && to.reference && typeof to.reference === 'object') {
      const ref: any = to.reference
      if (ref.value && typeof ref.value === 'object' && 'slug' in ref.value && ref.value.slug) {
        redirectUrl = `${ref.relationTo !== 'pages' ? `/${ref.relationTo}` : ''}/${ref.value.slug}`
      } else if (typeof ref.value === 'string' || typeof ref.value === 'number') {
        const document = (await getCachedDocument(ref.relationTo, ref.value)()) as Page | Post
        if (document && 'slug' in document) {
          redirectUrl = `${ref.relationTo !== 'pages' ? `/${ref.relationTo}` : ''}/${document.slug}`
        }
      }
    }
    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
