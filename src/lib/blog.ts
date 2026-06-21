import config from '@payload-config'
import { getPayload, type Where } from 'payload'

type LooseObject = Record<string, unknown>

type BlogCategory = 'industry-guide' | 'quality-testing' | 'company-news'

type BlogRecord = LooseObject & {
  _status?: string
  id?: number | string
  title?: string
  summary?: string
  author?: string
  category?: unknown
  publishedDate?: string
  featured?: boolean
  isPublished?: boolean
  coverImage?: unknown
  content?: unknown
}

type NormalizedMedia = {
  alt: string
  height?: number
  url: string
  width?: number
}

export type NormalizedBlogPost = {
  id: number | string | null
  slug: string
  title: string
  summary: string
  author: string
  category: BlogCategory
  publishedDate: string
  featured: boolean
  coverImage: NormalizedMedia
  content: unknown
}

export type BlogIndexData = {
  featuredPost: NormalizedBlogPost | null
  categoryCounts: Record<BlogCategory, number>
  postsByCategory: Record<BlogCategory, NormalizedBlogPost[]>
  allPosts: NormalizedBlogPost[]
  hasPosts: boolean
}

const BLOG_CATEGORIES: BlogCategory[] = [
  'industry-guide',
  'quality-testing',
  'company-news',
]

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  'industry-guide': 'Industry Trends',
  'quality-testing': 'Technical & Compliance',
  'company-news': 'Company Updates',
}

const FALLBACK_IMAGES: Record<BlogCategory, string> = {
  'industry-guide': '/images/banner-sample-2560x900.jpg',
  'quality-testing': '/images/products/steel-bottles.jpg',
  'company-news': '/images/products/gift-sets.jpg',
}

const EMPTY_INDEX: BlogIndexData = {
  featuredPost: null,
  categoryCounts: {
    'industry-guide': 0,
    'quality-testing': 0,
    'company-news': 0,
  },
  postsByCategory: {
    'industry-guide': [],
    'quality-testing': [],
    'company-news': [],
  },
  allPosts: [],
  hasPosts: false,
}

let payloadPromise: ReturnType<typeof getPayload> | null = null

function getInternalOrigin() {
  const explicitOrigin =
    process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || ''

  if (explicitOrigin.trim()) {
    return explicitOrigin.replace(/\/+$/, '')
  }

  const port = process.env.PORT?.trim()

  if (port) {
    return `http://127.0.0.1:${port}`
  }

  return null
}

async function fetchBlogPostsFromAPI() {
  const origin = getInternalOrigin()

  if (!origin) {
    return null
  }

  try {
    const response = await fetch(`${origin}/api/blog-posts?limit=100&depth=1`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as {
      docs?: BlogRecord[]
    }

    if (!Array.isArray(payload.docs)) {
      return null
    }

    return payload.docs.filter(
      (doc) => isLooseObject(doc) && (doc.isPublished === true || doc._status === 'published'),
    ) as BlogRecord[]
  } catch {
    return null
  }
}

function isLooseObject(value: unknown): value is LooseObject {
  return typeof value === 'object' && value !== null
}

async function canReachDatabase() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    return false
  }

  return true
}

async function getPayloadClient() {
  const reachable = await canReachDatabase()

  if (!reachable) {
    return null
  }

  if (!payloadPromise) {
    payloadPromise = getPayload({ config, cron: true })
  }

  return payloadPromise
}

function toBlogCategory(value: unknown): BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory)
    ? (value as BlogCategory)
    : 'industry-guide'
}

function normalizeMedia(media: unknown, category: BlogCategory, title: string): NormalizedMedia {
  if (!isLooseObject(media)) {
    return {
      alt: `${title} cover image`,
      url: FALLBACK_IMAGES[category],
    }
  }

  const sizes = isLooseObject(media.sizes) ? media.sizes : null
  const full = sizes && isLooseObject(sizes.full) ? sizes.full : null
  const card = sizes && isLooseObject(sizes.card) ? sizes.card : null
  const thumbnail = sizes && isLooseObject(sizes.thumbnail) ? sizes.thumbnail : null
  const url =
    (typeof media.url === 'string' ? media.url : null) ||
    (full && typeof full.url === 'string' ? full.url : null) ||
    (card && typeof card.url === 'string' ? card.url : null) ||
    (thumbnail && typeof thumbnail.url === 'string' ? thumbnail.url : null)

  return {
    alt: typeof media.alt === 'string' && media.alt.trim() ? media.alt.trim() : `${title} cover image`,
    height: typeof media.height === 'number' ? media.height : undefined,
    url: typeof url === 'string' ? url : FALLBACK_IMAGES[category],
    width: typeof media.width === 'number' ? media.width : undefined,
  }
}

function normalizeDate(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    return ''
  }

  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toISOString()
}

function normalizeSummary(value: unknown, category: BlogCategory) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  return `${CATEGORY_LABELS[category]} content summary coming soon.`
}

function slugifyText(value: string | null | undefined) {
  if (!value) {
    return ''
  }

  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createBlogSlug(doc: BlogRecord, title: string) {
  const titleSlug = slugifyText(title) || 'article'
  const idPart =
    typeof doc.id === 'number' || typeof doc.id === 'string' ? String(doc.id).trim() : ''

  return idPart ? `${idPart}-${titleSlug}` : titleSlug
}

function normalizePost(doc: BlogRecord): NormalizedBlogPost {
  const category = toBlogCategory(doc.category)
  const title =
    typeof doc.title === 'string' && doc.title.trim() ? doc.title.trim() : 'Untitled Blog Post'

  return {
    id: typeof doc.id === 'number' || typeof doc.id === 'string' ? doc.id : null,
    slug: createBlogSlug(doc, title),
    title,
    summary: normalizeSummary(doc.summary, category),
    author: typeof doc.author === 'string' ? doc.author.trim() : '',
    category,
    publishedDate: normalizeDate(doc.publishedDate),
    featured: doc.featured === true,
    coverImage: normalizeMedia(doc.coverImage, category, title),
    content: doc.content ?? null,
  }
}

function sortPosts(posts: NormalizedBlogPost[]) {
  return [...posts].sort((left, right) => {
    const leftTime = left.publishedDate ? new Date(left.publishedDate).getTime() : 0
    const rightTime = right.publishedDate ? new Date(right.publishedDate).getTime() : 0

    return rightTime - leftTime
  })
}

function buildIndex(posts: NormalizedBlogPost[]): BlogIndexData {
  const allPosts = sortPosts(posts)
  const postsByCategory: BlogIndexData['postsByCategory'] = {
    'industry-guide': [],
    'quality-testing': [],
    'company-news': [],
  }

  for (const post of allPosts) {
    postsByCategory[post.category].push(post)
  }

  const featuredPost = allPosts.find((post) => post.featured) || allPosts[0] || null

  return {
    featuredPost,
    categoryCounts: {
      'industry-guide': postsByCategory['industry-guide'].length,
      'quality-testing': postsByCategory['quality-testing'].length,
      'company-news': postsByCategory['company-news'].length,
    },
    postsByCategory,
    allPosts,
    hasPosts: allPosts.length > 0,
  }
}

export function getBlogCategoryLabel(category: BlogCategory) {
  return CATEGORY_LABELS[category]
}

export function getBlogCategories() {
  return BLOG_CATEGORIES
}

function publishedBlogWhere() {
  const where: Where = {
    or: [
      {
        isPublished: {
          equals: true,
        },
      } as Where,
      {
        and: [
          {
            isPublished: {
              exists: false,
            },
          } as Where,
          {
            _status: {
              equals: 'published',
            },
          } as Where,
        ],
      } as Where,
    ],
  }

  return where
}

export async function getBlogIndex(): Promise<BlogIndexData> {
  try {
    const payload = await getPayloadClient()

    if (!payload) {
      const docsFromAPI = await fetchBlogPostsFromAPI()

      if (!docsFromAPI?.length) {
        return EMPTY_INDEX
      }

      return buildIndex(docsFromAPI.map((doc) => normalizePost(doc)))
    }

    const result = await payload.find({
      collection: 'blog-posts',
      limit: 100,
      depth: 1,
      pagination: false,
      where: publishedBlogWhere(),
    })

    const docs = Array.isArray(result.docs)
      ? result.docs.filter(isLooseObject).map((doc) => normalizePost(doc as BlogRecord))
      : []

    if (!docs.length) {
      return EMPTY_INDEX
    }

    return buildIndex(docs)
  } catch {
    const docsFromAPI = await fetchBlogPostsFromAPI()

    if (!docsFromAPI?.length) {
      return EMPTY_INDEX
    }

    return buildIndex(docsFromAPI.map((doc) => normalizePost(doc)))
  }
}

export async function getBlogPostBySlug(slug: string): Promise<NormalizedBlogPost | null> {
  const normalizedSlug = slug.trim().toLowerCase()

  if (!normalizedSlug) {
    return null
  }

  try {
    const payload = await getPayloadClient()

    if (!payload) {
      const docsFromAPI = await fetchBlogPostsFromAPI()
      const posts = docsFromAPI?.map((doc) => normalizePost(doc)) || []

      return posts.find((post) => post.slug === normalizedSlug) || null
    }

    const result = await payload.find({
      collection: 'blog-posts',
      limit: 100,
      depth: 1,
      pagination: false,
      where: publishedBlogWhere(),
    })

    const docs = Array.isArray(result.docs)
      ? result.docs.filter(isLooseObject).map((doc) => normalizePost(doc as BlogRecord))
      : []

    return docs.find((post) => post.slug === normalizedSlug) || null
  } catch {
    const docsFromAPI = await fetchBlogPostsFromAPI()
    const posts = docsFromAPI?.map((doc) => normalizePost(doc)) || []

    return posts.find((post) => post.slug === normalizedSlug) || null
  }
}
