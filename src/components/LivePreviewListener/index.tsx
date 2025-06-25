'use client'
import { getClientSideURL } from '../../utilities/getURL'
// @ts-ignore
let PayloadLivePreview: any = () => null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PayloadLivePreview = require('@payloadcms/live-preview-react').RefreshRouteOnSave
} catch {}
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}
