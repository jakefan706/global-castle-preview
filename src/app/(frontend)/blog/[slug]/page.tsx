import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BlogRichText from '../../components/blog/BlogRichText'
import { getBlogCategoryLabel, getBlogPostBySlug } from '@/lib/blog'

export const dynamic = 'force-dynamic'

function formatPublishedDate(value: string) {
  if (!value) {
    return 'Date to be confirmed'
  }

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parsed)
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article Not Found | Global Castle',
    }
  }

  return {
    title: `${post.title} | Global Castle`,
    description: post.summary,
  }
}

export default async function BlogDetailPage({
  params,
}: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-[#f4f8fa] pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c7276] transition-colors duration-200 hover:text-[#095d60]"
        >
          <span>Back to Blog</span>
        </Link>

        <div className="mt-8 rounded-[4px] border border-[#d5e1e7] bg-white p-6 shadow-[0_18px_48px_rgba(10,32,46,0.08)] sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#5a6d79]">
            <span className="font-semibold uppercase tracking-[0.18em] text-[#0c7276]">
              {getBlogCategoryLabel(post.category)}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#b8c6ce]" />
            <span>{formatPublishedDate(post.publishedDate)}</span>
            <span className="h-1 w-1 rounded-full bg-[#b8c6ce]" />
            <span>{post.author || 'Global Castle Editorial'}</span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#13232c] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl whitespace-pre-line text-lg leading-8 text-[#425563]">
            {post.summary}
          </p>

          <figure className="mt-8 flex justify-center overflow-hidden rounded-[4px] bg-[#dce5ea] py-2">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              width={post.coverImage.width && post.coverImage.width > 0 ? post.coverImage.width : 1200}
              height={post.coverImage.height && post.coverImage.height > 0 ? post.coverImage.height : 800}
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="max-w-[90%] object-contain"
              style={{
                height: 'auto',
                width: 'auto',
              }}
            />
          </figure>

          <div className="mt-10 border-t border-[#d5e1e7] pt-8">
            <BlogRichText value={post.content} />
          </div>
        </div>
      </div>
    </article>
  )
}
