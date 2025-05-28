import type { Metadata } from 'next'
import React from 'react'
import { draftMode } from 'next/headers'
import { GeistSans, GeistMono } from 'geist/font'

import { cn } from '../../utilities/ui'
import { getServerSideURL } from '../../utilities/getURL'
import { mergeOpenGraph } from '../../utilities/mergeOpenGraph'

import { InitTheme } from '../../providers/Theme/InitTheme'
import { Providers } from '../../providers'
import { Header } from '../../header/Component'
import { Footer } from '../../footer/Component'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
