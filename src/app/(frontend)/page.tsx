import PageTemplate, { generateMetadata } from './[slug]/page'

type HomePageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePageWrapper(props: HomePageProps) {
  console.log('Rendering Homepage') // This will show in the server logs
  return (
    <PageTemplate params={Promise.resolve({ slug: 'home' })} searchParams={Promise.resolve({})} />
  )
}

// We also re-export metadata if needed
export { generateMetadata }
