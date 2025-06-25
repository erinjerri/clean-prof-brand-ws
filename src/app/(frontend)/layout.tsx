import type { Metadata } from 'next'
import React from 'react'
import { draftMode } from 'next/headers'
import { GeistSans, GeistMono } from 'geist/font'

import { cn } from '../../utilities/ui'
import { getServerSideURL } from '../../utilities/getURL'
import { mergeOpenGraph } from '../../utilities/mergeOpenGraph'

import { InitTheme } from '../../providers/Theme/InitTheme'
import { Providers } from '../../providers'
import { HeaderComponent } from '@/Header/Component'
import { FooterComponent } from '@/Footer/Component'

import './globals.css'

import configPromise from '../../../payload.config'
import { homeStatic } from '../../../endpoints/seed/home-static'
import { RenderBlocks } from '../../../blocks/RenderBlocks'
import { RenderHero } from '../../../heros/RenderHero'
import { generateMeta } from '../../../utilities/generateMeta'
import { serializePayloadData } from '../../../utilities/serializePayload'
import { LivePreviewListener } from '../../../components/LivePreviewListener'
import { PayloadRedirects } from '../../../components/PayloadRedirects'
import type { Page as PageType } from '../../../payload-types'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await draftMode()

  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <Providers>
          <HeaderComponent />
          <main>{children}</main>
          <FooterComponent />
        </Providers>
      </body>
    </html>
  )
}
