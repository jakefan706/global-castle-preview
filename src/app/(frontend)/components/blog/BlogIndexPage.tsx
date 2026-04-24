import Image from 'next/image'
import Link from 'next/link'

import {
  getBlogCategories,
  getBlogCategoryLabel,
  type BlogIndexData,
  type NormalizedBlogPost,
} from '@/lib/blog'

const CATEGORY_NOTES = {
  'industry-guide':
    'Commercial sourcing direction for buyers comparing formats, positioning, and customization paths.',
  'quality-testing':
    'Quality review, testing priorities, and compliance-oriented checkpoints for export programs.',
  'company-news':
    'Factory updates, capability notes, and operational news relevant to distributors and brand teams.',
} as const

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

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

function BlogPreviewRow({ post }: { post: NormalizedBlogPost }) {
  return (
    <article className="group grid gap-6 border-t border-[#d7d1c8] py-8 first:border-t-0 first:pt-0 md:grid-cols-[240px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#ddd6cb]">
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt}
          fill
          sizes="(min-width: 768px) 240px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#6f675d]">
          <span className="font-semibold uppercase tracking-[0.18em] text-[#2d5958]">
            {getBlogCategoryLabel(post.category)}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#aa9f92]" />
          <span>{formatPublishedDate(post.publishedDate)}</span>
          {post.featured ? (
            <>
              <span className="h-1 w-1 rounded-full bg-[#aa9f92]" />
              <span className="font-medium uppercase tracking-[0.14em] text-[#8b7f72]">
                Featured
              </span>
            </>
          ) : null}
        </div>

        <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.03em] text-[#1f1b17] transition-colors duration-200 group-hover:text-[#2d5958] sm:text-[2rem]">
          {post.title}
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5e584f] sm:text-base">
          {post.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#7a7268]">
          {post.author ? <span>By {post.author}</span> : <span>Global Castle Editorial</span>}
          <span className="h-1 w-1 rounded-full bg-[#b8aea2]" />
          <span>Preview index only</span>
        </div>
      </div>
    </article>
  )
}

function FeaturedStory({ post }: { post: NormalizedBlogPost }) {
  return (
    <section className="bg-[#151b1e] py-20 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Lead Article
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The story we want buyers to notice first.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#c3c8cc]">
            This lead module is treated like an editorial cover, not a resource card, so the blog
            reads as a content destination instead of another capability page.
          </p>
        </div>

        <article className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#c3c8cc]">
              <span className="font-semibold uppercase tracking-[0.18em] text-[#00868b]">
                {getBlogCategoryLabel(post.category)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{formatPublishedDate(post.publishedDate)}</span>
            </div>

            <h3 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {post.title}
            </h3>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#d2d8dc] sm:text-base">
              {post.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#c3c8cc]">
              <span>{post.author || 'Global Castle Editorial'}</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>CMS-backed article preview</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[4px] bg-[#0b1012]">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,11,0.08)_0%,rgba(5,9,11,0.24)_52%,rgba(5,9,11,0.82)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00868b]">
                    Global Castle Journal
                  </p>
                  <p className="mt-2 text-sm text-white/78">
                    A buyer-facing content stream for sourcing decisions.
                  </p>
                </div>
                <div className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/82 backdrop-blur-sm sm:block">
                  Issue lead
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <section className="bg-[#f3eee5] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-y border-[#d7d1c8] py-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d5958]">
              Editorial Desk
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1f1b17] sm:text-4xl">
              The blog index is live, and the first articles are still being prepared.
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-[#5e584f] sm:text-base">
              This space is reserved for CMS-backed sourcing content. Until articles are published,
              buyers can continue with the resources hub, solution pages, or a direct inquiry about
              MOQ, packaging, branding, quality, and lead time.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#1f1b17] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111111]"
              >
                <span>Open Resources</span>
                <ArrowIcon />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-[#bdb4a8] px-6 py-3 text-sm font-semibold text-[#2d5958] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2d5958]"
              >
                <span>Explore Solutions</span>
                <ArrowIcon />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-[#bdb4a8] px-6 py-3 text-sm font-semibold text-[#5e584f] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5e584f]"
              >
                <span>Start Inquiry</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function BlogIndexPage({ blog }: { blog: BlogIndexData }) {
  const categories = getBlogCategories()
  const visibleCategories = categories.filter((category) => blog.categoryCounts[category] > 0)

  return (
    <>
      <section className="relative overflow-hidden bg-[#f3eee5] pt-28 text-[#1f1b17] sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-px bg-[#cfc7bb]" />
        <div className="absolute inset-y-0 left-[58%] hidden w-px bg-[#ddd6cb] lg:block" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-8 lg:pb-20">
          <div className="lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#2d5958]">
              Global Castle Journal
            </p>
            <h1 className="mt-6 text-[3.3rem] font-semibold leading-[0.92] tracking-[-0.05em] text-[#1f1b17] sm:text-[4.6rem] lg:text-[5.6rem]">
              Blog built as an editorial front page, not a second resources hub.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#5e584f] sm:text-lg">
              A buyer-facing content index for sourcing teams comparing branding options, MOQ
              planning, packaging choices, quality checkpoints, and delivery timing.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#1f1b17] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111111]"
              >
                <span>Browse Editorial Tracks</span>
                <ArrowIcon />
              </Link>
              <Link
                href={blog.featuredPost ? '#lead-article' : '/resources'}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-[#bdb4a8] px-7 py-3.5 text-sm font-semibold text-[#2d5958] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2d5958]"
              >
                <span>{blog.featuredPost ? 'Jump to Lead Article' : 'Open Resources'}</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[4px] bg-[#151b1e]">
              <Image
                src={blog.featuredPost?.coverImage.url || '/images/banner3.webp'}
                alt={blog.featuredPost?.coverImage.alt || 'Global Castle blog editorial hero'}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,18,20,0.08)_0%,rgba(15,18,20,0.2)_40%,rgba(15,18,20,0.84)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00868b]">
                  Issue Overview
                </p>
                <div className="mt-4 grid gap-4 border-t border-white/15 pt-4 sm:grid-cols-3">
                  {categories.map((category) => (
                    <div key={category}>
                      <p className="text-2xl font-semibold text-white">{blog.categoryCounts[category]}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/72">
                        {getBlogCategoryLabel(category)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 border-t border-[#d7d1c8] pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b7f72]">
                  Format
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5e584f]">
                  Editorial preview index with CMS-backed article rows.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b7f72]">
                  Tone
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5e584f]">
                  For sourcing managers, distributors, and brand-side buyers.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b7f72]">
                  Current Phase
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5e584f]">
                  Listing-focused now, detail pages later after blog slug support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tracks" className="bg-[#faf7f1] scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid border-y border-[#d7d1c8] py-8 md:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category}
                href={`#${category}`}
                className={`group px-0 py-4 transition-colors duration-200 md:px-6 ${
                  index < categories.length - 1 ? 'md:border-r md:border-[#d7d1c8]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b7f72]">
                      Track {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1b17] transition-colors duration-200 group-hover:text-[#2d5958]">
                      {getBlogCategoryLabel(category)}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#5e584f]">
                      {CATEGORY_NOTES[category]}
                    </p>
                  </div>
                  <div className="pt-1 text-right">
                    <p className="text-3xl font-semibold text-[#2d5958]">{blog.categoryCounts[category]}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#8b7f72]">
                      Posts
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {blog.featuredPost ? (
        <div id="lead-article">
          <FeaturedStory post={blog.featuredPost} />
        </div>
      ) : null}

      {blog.hasPosts ? (
        <section className="bg-[#faf7f1] py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {visibleCategories.map((category) => (
              <section
                key={category}
                id={category}
                className="grid gap-10 border-t border-[#d7d1c8] py-12 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[280px_1fr]"
              >
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b7f72]">
                    {String(categories.indexOf(category) + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1f1b17]">
                    {getBlogCategoryLabel(category)}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#5e584f]">
                    {CATEGORY_NOTES[category]}
                  </p>
                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-4xl font-semibold text-[#2d5958]">
                      {blog.categoryCounts[category]}
                    </span>
                    <span className="pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b7f72]">
                      articles
                    </span>
                  </div>
                </div>

                <div className="rounded-[4px] bg-transparent">
                  {blog.postsByCategory[category].map((post) => (
                    <BlogPreviewRow key={post.id ?? `${category}-${post.title}`} post={post} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      ) : (
        <EmptyState />
      )}

      <section className="bg-[#1f1b17] py-16 text-white lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-end lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
              Inquiry Desk
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Need an answer tied to your own product brief?
            </h2>
          </div>
          <div className="lg:pl-12">
            <p className="text-sm leading-7 text-[#d7d0c7] sm:text-base">
              Share your target product type, quantity, branding requirements, packaging direction,
              and expected timing. We can help connect article-level guidance with a practical OEM
              sourcing conversation.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#00868b] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72]"
            >
              <span>Start Your Inquiry</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
