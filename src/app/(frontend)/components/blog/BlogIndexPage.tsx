import Image from 'next/image'
import Link from 'next/link'

import {
  getBlogCategoryLabel,
  type BlogIndexData,
  type NormalizedBlogPost,
} from '@/lib/blog'

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
    month: 'short',
    day: 'numeric',
  }).format(parsed)
}

function BlogGridCard({ post }: { post: NormalizedBlogPost }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-[#eef3f5]"
      >
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 34vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#4d5f69]">
          {getBlogCategoryLabel(post.category)}
        </span>

        <div className="mt-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#7b8b94]">
            {formatPublishedDate(post.publishedDate)}
          </span>
        </div>

        <h2 className="mt-4 text-[1.45rem] font-semibold leading-[1.35] tracking-[-0.03em] text-[#13232c] transition-colors duration-200 group-hover:text-[#0c7276]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#465964]">
          {post.summary}
        </p>
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <section className="bg-white pb-20 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#dbe3e7] pt-10">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#13232c] sm:text-4xl">
            The first articles are being prepared for publication.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#556771]">
            This journal is reserved for sourcing insight, compliance guidance, and product
            direction across the global drinkware category.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-[4px] bg-[#13232c] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0c181e]"
            >
              Open Resources
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-[4px] border border-[#c7d4da] px-6 py-3.5 text-sm font-semibold text-[#13232c] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#13232c]"
            >
              Start Inquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function SubscribeSection() {
  const subscribeMessage = encodeURIComponent(
    'Please add me to the UrbanEco Insights mailing list for technical updates and product trend alerts.',
  )

  return (
    <section className="border-t border-[#d7e0e4] bg-[#f3f7f8] py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0c7276]">
            Stay Informed
          </p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#16313f] sm:text-5xl">
            Stay Informed.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5c6e79] sm:text-lg">
            Get our latest technical insights and product trend alerts delivered straight to your
            inbox.
          </p>
        </div>

        <form
          action="/contact"
          method="get"
          className="mx-auto mt-10 flex max-w-3xl flex-col gap-2 rounded-[6px] border border-[#d2dde2] bg-white p-2 shadow-[0_18px_42px_rgba(14,42,56,0.06)] sm:flex-row"
        >
          <input type="hidden" name="message" value={subscribeMessage} />
          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="h-10 flex-1 rounded-[4px] border border-transparent bg-[#f5f8f9] px-4 text-sm text-[#16313f] outline-none transition-colors placeholder:text-[#80919a] focus:border-[#9fc6c8] focus:bg-white"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#16313f] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#102530]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default function BlogIndexPage({ blog }: { blog: BlogIndexData }) {
  if (!blog.hasPosts) {
    return (
      <>
        <section className="bg-white pt-24 sm:pt-28">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0c7276]">
                Journal &amp; Insights
              </p>
              <h1 className="mt-6 text-[2.3rem] font-semibold leading-[1] tracking-[-0.05em] text-[#13232c] sm:text-[3.4rem] lg:text-[4.2rem]">
                Industry Insights &amp; Trends
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#556771] sm:text-lg">
                Expert perspectives on global drinkware trends, material compliance, and
                manufacturing innovations. Helping you make informed sourcing decisions.
              </p>
            </div>
          </div>
        </section>

        <EmptyState />
        <SubscribeSection />
      </>
    )
  }

  return (
    <>
      <section className="bg-white pt-24 sm:pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0c7276]">
              Journal &amp; Insights
            </p>
            <h1 className="mt-6 text-[2.3rem] font-semibold leading-[1] tracking-[-0.05em] text-[#13232c] sm:text-[3.4rem] lg:text-[4.2rem]">
              Industry Insights &amp; Trends
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#556771] sm:text-lg">
              Expert perspectives on global drinkware trends, material compliance, and
              manufacturing innovations. Helping you make informed sourcing decisions.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#556771] sm:text-lg">
              Stay informed and make better sourcing decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-x-8 gap-y-14 border-t border-[#dbe3e7] pt-10 md:grid-cols-2 xl:grid-cols-3">
            {blog.allPosts.map((post) => (
              <BlogGridCard key={post.id ?? post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
    </>
  )
}
