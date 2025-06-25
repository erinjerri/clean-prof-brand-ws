import PageTemplate, { generateMetadata } from './[slug]/page'

type HomePageProps = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePageWrapper(props: HomePageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  return <PageTemplate params={{ slug: 'home' }} searchParams={searchParams} />
}

// We also re-export metadata if needed
export { generateMetadata }
