import PageTemplate, { generateMetadata } from './[slug]/page'
import { notFound } from 'next/navigation'

export default function HomePageWrapper(props: any) {
  // if (!PageTemplate) return notFound()
  console.log('Rendering Homepage'); // This will show in the server logs
  return <PageTemplate params={{ slug: 'home' }} {...props} />
}

// We also re-export metadata if needed
export { generateMetadata }
