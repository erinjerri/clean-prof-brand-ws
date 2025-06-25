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
import { LivePreviewListener } from '../../components/LivePreviewListener'
import { PayloadRedirects } from '../../components/PayloadRedirects'
import { serializePayloadData } from '../../utilities/serializePayload'
import type { Page as PageType } from '../../payload-types'

type HomePageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage(props: HomePageProps) {
  const { isEnabled } = await draftMode()
  const searchParams = await props.searchParams
  const slug = 'home'
  const url = '/' + slug

  let page: PageType | null = await queryPageBySlug({ slug })

  if (!page) {
    page = homeStatic as PageType
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  // Serialize the data before passing to components
  const serializedPage = serializePayloadData(page)
  const { hero, layout } = serializedPage

  return (
    <article className="pt-16 pb-24">
      <PayloadRedirects disableNotFound url={url} />
      {isEnabled && <LivePreviewListener />}
      {hero && <RenderHero {...hero} />}
      {layout && <RenderBlocks blocks={layout} />}
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'home'
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
