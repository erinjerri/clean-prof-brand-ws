import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '../utilities/getGlobals'
import { serializePayloadData } from '../utilities/serializePayload'
import React from 'react'

import type { Header } from '../payload-types'

export async function HeaderComponent() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  // Serialize the data before passing to client component
  const serializedHeaderData = serializePayloadData(headerData)

  return <HeaderClient data={serializedHeaderData} />
}
