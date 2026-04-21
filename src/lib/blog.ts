import config from '@payload-config'
import { Socket } from 'node:net'
import { getPayload } from 'payload'

type LooseObject = Record<string, unknown>

type BlogCategory = 'industry-guide' | 'quality-testing' | 'company-news'

type BlogRecord = LooseObject & {
  id?: number | string
  title?: string
  summary?: string
  author?: string
  category?: unknown
  publishedDate?: string
  featured?: boolean
  coverImage?: unknown
}

type NormalizedMedia = {
  alt: string
  url: string
}

export type NormalizedBlogPost = {
  id: number | string | null
  title: string
  summary: string
  author: string
  category: BlogCategory
  publishedDate: string
  featured: boolean
  coverImage: NormalizedMedia
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
  'industry-guide': 'Industry Guide',
  'quality-testing': 'Quality & Testing',
  'company-news': 'Company News',
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

let databaseReachability: boolean | null = null
let payloadPromise: ReturnType<typeof getPayload> | null = null

function isLooseObject(value: unknown): value is LooseObject {
  return typeof value === 'object' && value !== null
}

async function canReachDatabase() {
  if (databaseReachability !== null) {
    return databaseReachability
  }

  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    databaseReachability = false
    return databaseReachability
  }

  try {
    const url = new URL(connectionString)
    const host = url.hostname || '127.0.0.1'
    const port = Number(url.port || '5432')

    databaseReachability = await new Promise<boolean>((resolve) => {
      const socket = new Socket()
      const finish = (value: boolean) => {
        socket.removeAllListeners()
        socket.destroy()
        resolve(value)
      }

      socket.setTimeout(250)
      socket.once('connect', () => finish(true))
      socket.once('timeout', () => finish(false))
      socket.once('error', () => finish(false))
      socket.connect(port, host)
    })
  } catch {
    databaseReachability = false
  }

  return databaseReachability
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
    url: typeof url === 'string' ? url : FALLBACK_IMAGES[category],
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

function normalizePost(doc: BlogRecord): NormalizedBlogPost {
  const category = toBlogCategory(doc.category)
  const title =
    typeof doc.title === 'string' && doc.title.trim() ? doc.title.trim() : 'Untitled Blog Post'

  return {
    id: typeof doc.id === 'number' || typeof doc.id === 'string' ? doc.id : null,
    title,
    summary: normalizeSummary(doc.summary, category),
    author: typeof doc.author === 'string' ? doc.author.trim() : '',
    category,
    publishedDate: normalizeDate(doc.publishedDate),
    featured: doc.featured === true,
    coverImage: normalizeMedia(doc.coverImage, category, title),
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

export async function getBlogIndex(): Promise<BlogIndexData> {
  try {
    const payload = await getPayloadClient()

    if (!payload) {
      return EMPTY_INDEX
    }

    const result = await payload.find({
      collection: 'blog-posts',
      limit: 100,
      depth: 1,
      pagination: false,
    })

    const docs = Array.isArray(result.docs)
      ? result.docs.filter(isLooseObject).map((doc) => normalizePost(doc as BlogRecord))
      : []

    if (!docs.length) {
      return EMPTY_INDEX
    }

    return buildIndex(docs)
  } catch {
    return EMPTY_INDEX
  }
}
