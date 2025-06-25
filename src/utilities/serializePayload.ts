// Helper function to serialize Payload data for Client Components
export function serializePayloadData(data: any): any {
  if (!data) return data

  if (typeof data === 'object') {
    if (data instanceof Uint8Array) {
      return Array.from(data)
    }

    if (Array.isArray(data)) {
      return data.map(serializePayloadData)
    }

    const serialized: any = {}
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializePayloadData(value)
    }
    return serialized
  }

  return data
}
