declare module '@/utilities/ui' {
  import { ClassValue } from 'clsx'
  export function cn(...inputs: ClassValue[]): string
}

declare module '@/utilities/useClickableCard' {
  import { RefObject } from 'react'

  type UseClickableCardType<T extends HTMLElement> = {
    card: {
      ref: RefObject<T | null>
    }
    link: {
      ref: RefObject<HTMLAnchorElement | null>
    }
  }

  interface Props {
    external?: boolean
    newTab?: boolean
    scroll?: boolean
  }

  export default function useClickableCard<T extends HTMLElement>(
    props?: Props,
  ): UseClickableCardType<T>
}
