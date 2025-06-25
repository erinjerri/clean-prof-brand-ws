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

  if (redirectItem && typeof redirectItem.to === 'object') {
    if ('url' in redirectItem.to && redirectItem.to.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string = ''

    if (
      'reference' in redirectItem.to &&
      redirectItem.to.reference &&
      typeof redirectItem.to.reference === 'object'
    ) {
      const ref = redirectItem.to.reference
      if (ref.value && typeof ref.value === 'object' && 'slug' in ref.value && ref.value.slug) {
        redirectUrl = `${ref.relationTo !== 'pages' ? `/${ref.relationTo}` : ''}/${ref.value.slug}`
      } else if (typeof ref.value === 'string' || typeof ref.value === 'number') {
        // fallback: fetch document and use slug if possible
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
