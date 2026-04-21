import type { Metadata } from 'next'

import BlogIndexPage from '../components/blog/BlogIndexPage'
import { getBlogIndex } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Global Castle',
  description:
    'Explore Global Castle blog insights for custom drinkware sourcing, including industry guidance, quality and testing notes, and company updates for B2B buyers.',
}

export default async function BlogPage() {
  const blog = await getBlogIndex()

  return <BlogIndexPage blog={blog} />
}
