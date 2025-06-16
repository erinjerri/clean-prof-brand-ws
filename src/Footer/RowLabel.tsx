'use client'
import React from 'react'

type RowLabelProps = {
  data?: {
    link?: {
      label?: string
    }
  }
  rowNumber?: number
}

export const RowLabel: React.FC<RowLabelProps> = ({ data, rowNumber }) => {
  const label = data?.link?.label
    ? `Nav item ${rowNumber !== undefined ? rowNumber + 1 : ''}: ${data.link.label}`
    : 'Row'

  return <div>{label}</div>
}
