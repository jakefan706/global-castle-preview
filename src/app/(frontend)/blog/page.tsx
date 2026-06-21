import type { Metadata } from 'next'

import BlogIndexPage from '../components/blog/BlogIndexPage'
import { getBlogIndex } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Global Castle',
  description:
    'Expert perspectives on global drinkware trends, material compliance, and manufacturing innovations to support informed sourcing decisions.',
}

export default async function BlogPage() {
  const blog = await getBlogIndex()

  return <BlogIndexPage blog={blog} />
}
