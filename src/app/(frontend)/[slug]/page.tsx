import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'
import { cache } from 'react'

import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { homeStatic } from '../../endpoints/seed/home-static'

import { RenderBlocks } from '../../blocks/RenderBlocks'
import { RenderHero } from '../../heros/RenderHero'
import { generateMeta } from '../../utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '../../components/LivePreviewListener'
import { PayloadRedirects } from '../../components/PayloadRedirects'
import type { Page as PageType } from '../../payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params =
    pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => ({ slug })) || []

  return params
}

type Args = {
  params: {
    slug?: string
  }
}

export default async function Page({ params }: Args) {
  const { isEnabled } = await draftMode()
  const slug = params?.slug ?? 'home'
  const url = '/' + slug

  let page: PageType | null = await queryPageBySlug({ slug })

  if (!page && slug === 'home') {
    page = homeStatic as PageType
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {isEnabled && <LivePreviewListener />}
      {hero && <RenderHero {...hero} />}
      {layout && <RenderBlocks blocks={layout} />}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const slug = params?.slug ?? 'home'
  const page = await queryPageBySlug({ slug })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }): Promise<PageType | null> => {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft: isEnabled,
    limit: 1,
    pagination: false,
    overrideAccess: isEnabled,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
