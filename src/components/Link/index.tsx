import { Button, type ButtonProps } from '../ui/button'
import { cn } from '../../utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '../../payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?:
    | {
        relationTo: 'pages' | 'posts'
        value: Page | Post | string | number | null | undefined
      }
    | null
    | undefined
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null | undefined
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  // Defensive: always ensure href is string or undefined
  let href: string | undefined = typeof url === 'string' ? url : undefined
  if (type === 'reference' && reference && typeof reference === 'object') {
    if (
      reference.value &&
      typeof reference.value === 'object' &&
      'slug' in reference.value &&
      typeof reference.value.slug === 'string'
    ) {
      href = `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
    } else if (typeof reference.value === 'string' || typeof reference.value === 'number') {
      href = `/${reference.relationTo}/${reference.value}`
    }
  }

  // If href is still not a string, don't render the link
  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
