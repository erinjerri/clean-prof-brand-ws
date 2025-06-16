declare module '@/cssVariables' {
  export const cssVariables: {
    breakpoints: {
      sm: number
      md: number
      lg: number
      xl: number
      '2xl': number
    }
  }
}

declare module '@/utilities/getURL' {
  export function getClientSideURL(): string
  export function getServerSideURL(): string
}

declare module '@payloadcms/plugin-seo'
declare module '@payloadcms/db-mongodb'
