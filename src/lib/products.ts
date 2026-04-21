import config from '@payload-config'
import { Socket } from 'node:net'
import { getPayload } from 'payload'

type LooseObject = Record<string, unknown>

type ProductRecord = LooseObject & {
  id?: number | string
  slug?: string
  name?: string
  itemNumber?: string
  material?: string
  customizeMOQ?: string
  category?: unknown
  capacityRange?: unknown
  applications?: unknown
  mainImage?: unknown
  gallery?: unknown
}

type NormalizedMedia = {
  id?: number | string
  alt: string
  url: string
}

type NormalizedProduct = {
  id: number | string | null
  slug: string
  name: string
  itemNumber: string
  material: string
  customizeMOQ: string
  categoryName: string
  categorySlug: string
  capacityLabel: string
  applications: string[]
  mainImage: NormalizedMedia
  gallery: NormalizedMedia[]
  featureBullets: string[]
  specs: Array<{ label: string; value: string }>
  logoMethods: string[]
  finishOptions: string[]
  packagingOptions: string[]
  relatedCategories: Array<{ name: string; slug: string; image: string }>
  inquiryMessage: string
}

const FALLBACK_MAIN_IMAGE: NormalizedMedia = {
  alt: 'Double Wall Stainless Steel Tumbler',
  url: '/images/products/tumblers.jpg',
}

const FALLBACK_GALLERY: NormalizedMedia[] = [
  FALLBACK_MAIN_IMAGE,
  { alt: 'Stainless steel tumbler lid detail', url: '/images/products/steel-bottles.jpg' },
  { alt: 'Gift-ready tumbler packaging', url: '/images/products/gift-sets.jpg' },
  { alt: 'Drinkware production capability', url: '/images/banner-sample-2560x900.jpg' },
  { alt: 'Category sample image', url: '/images/products/ceramic-mugs.jpg' },
  { alt: 'Category sample image', url: '/images/products/glassware.jpg' },
  { alt: 'Category sample image', url: '/images/products/plastic-cups.jpg' },
  { alt: 'Category sample image', url: '/images/products/tumblers.jpg' },
]

const RELATED_CATEGORY_FALLBACKS = [
  {
    name: 'Stainless Steel Bottles',
    slug: 'stainless-steel-bottles',
    image: '/images/products/steel-bottles.jpg',
  },
  {
    name: 'Stainless Steel Tumblers',
    slug: 'stainless-steel-tumblers',
    image: '/images/products/tumblers.jpg',
  },
  {
    name: 'Ceramic Mugs',
    slug: 'ceramic-mugs',
    image: '/images/products/ceramic-mugs.jpg',
  },
  {
    name: 'Plastic Bottles',
    slug: 'plastic-bottles',
    image: '/images/products/plastic-cups.jpg',
  },
]

const GC_ST_420_FALLBACK: NormalizedProduct = {
  id: null,
  slug: 'gc-st-420',
  name: 'Double Wall Stainless Steel Tumbler',
  itemNumber: 'GC-ST-420',
  material: '18/8 Stainless Steel',
  customizeMOQ: '500pcs',
  categoryName: 'Stainless Steel Tumblers',
  categorySlug: 'stainless-steel-tumblers',
  capacityLabel: '420ml / 14oz',
  applications: ['Coffee Chains', 'Corporate Gifts', 'Retail', 'Promotional Campaigns'],
  mainImage: FALLBACK_MAIN_IMAGE,
  gallery: FALLBACK_GALLERY,
  featureBullets: [
    'Double-wall vacuum insulation keeps drinks hot for 12 hours or cold for 24 hours.',
    'Premium 18/8 stainless steel body built for repeat commercial use and private-label programs.',
    'BPA-free spill-resistant lid design with a clean, giftable silhouette.',
    'Sweat-proof exterior helps preserve table surfaces and carry comfort.',
    'Wide-mouth opening supports easy filling, cleaning, and ice cube compatibility.',
  ],
  specs: [
    { label: 'Item Number', value: 'GC-ST-420' },
    { label: 'Capacity', value: '420ml / 14oz' },
    { label: 'Material', value: '18/8 stainless steel' },
    { label: 'Lid', value: 'BPA-free plastic lid' },
    { label: 'Decoration', value: 'Laser engraving / printing / custom finish' },
    { label: 'Packaging', value: 'Bulk pack / white box / custom color box' },
    { label: 'Application', value: 'Coffee chains, corporate gifts, retail, promotional campaigns' },
  ],
  logoMethods: ['Laser engraving', 'Silkscreen printing', 'UV printing', 'Heat transfer'],
  finishOptions: ['Powder coating', 'Metallic', 'Matte', 'Gloss', 'Gradient'],
  packagingOptions: ['White box', 'Color box', 'Gift box', 'Custom retail packaging'],
  relatedCategories: RELATED_CATEGORY_FALLBACKS,
  inquiryMessage:
    'I am interested in GC-ST-420. Please share MOQ, customization options, packaging choices, and sample lead time.',
}

let databaseReachability: boolean | null = null

function slugifyItemNumber(value: string | null | undefined) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

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

function normalizeMedia(media: unknown, fallbackAlt: string): NormalizedMedia {
  if (!isLooseObject(media)) {
    return { ...FALLBACK_MAIN_IMAGE, alt: fallbackAlt }
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
    id: typeof media.id === 'number' || typeof media.id === 'string' ? media.id : undefined,
    alt: typeof media.alt === 'string' ? media.alt : fallbackAlt,
    url: typeof url === 'string' ? url : FALLBACK_MAIN_IMAGE.url,
  }
}

function pickFeatureBullets(product: ProductRecord, capacityLabel: string, applications: string[]) {
  if (product.itemNumber === 'GC-ST-420' || slugifyItemNumber(product.itemNumber) === 'gc-st-420') {
    return GC_ST_420_FALLBACK.featureBullets
  }

  const features = [
    `${product.material ? `${toMaterialLabel(product.material)} construction` : 'Factory-grade drinkware construction'} supports dependable OEM and gifting programs.`,
    capacityLabel
      ? `${capacityLabel} format suitable for distributor, retail, and promotional sourcing.`
      : 'Capacity configuration can be tailored to target programs and market expectations.',
    'Decoration-ready exterior supports logo branding, surface finishing, and packaging customization.',
    applications.length
      ? `Fit for ${applications.slice(0, 3).join(', ').toLowerCase()} programs.`
      : 'Designed for B2B sourcing across retail, gift, and campaign channels.',
  ]

  return features
}

function toMaterialLabel(material: string | null | undefined) {
  if (!material) return 'Material not specified'

  const map: Record<string, string> = {
    'stainless-steel': '18/8 Stainless Steel',
    aluminum: 'Aluminum',
    plastic: 'BPA-Free Plastic',
    ceramic: 'Ceramic',
    glass: 'Glass',
    other: 'Custom Material',
  }

  return map[material] || material
}

function getCategoryName(category: unknown) {
  if (isLooseObject(category) && typeof category.name === 'string') {
    return category.name || 'Drinkware'
  }

  return 'Drinkware'
}

function getCategorySlug(category: unknown) {
  if (isLooseObject(category) && typeof category.slug === 'string') {
    return category.slug
  }

  return 'stainless-steel-tumblers'
}

function getCapacityLabel(range: unknown) {
  if (!range) return ''

  if (isLooseObject(range) && typeof range.name === 'string') {
    return range.name
  }

  return ''
}

function normalizeApplications(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      if (typeof item === 'string') return item
      if (isLooseObject(item) && typeof item.name === 'string') return item.name
      return null
    })
    .filter(Boolean) as string[]
}

function buildSpecs(product: ProductRecord, normalized: Omit<NormalizedProduct, 'specs'>) {
  const specs = [
    { label: 'Item Number', value: normalized.itemNumber },
    { label: 'Category', value: normalized.categoryName },
    { label: 'Material', value: normalized.material },
  ]

  if (normalized.capacityLabel) {
    specs.push({ label: 'Capacity', value: normalized.capacityLabel })
  }

  if (normalized.applications.length) {
    specs.push({ label: 'Application', value: normalized.applications.join(', ') })
  }

  specs.push({ label: 'Decoration', value: 'Laser engraving / silkscreen / UV print / heat transfer' })
  specs.push({ label: 'Packaging', value: 'Bulk pack / white box / color box / gift-ready packaging' })

  if (product.itemNumber === 'GC-ST-420' || slugifyItemNumber(product.itemNumber) === 'gc-st-420') {
    return GC_ST_420_FALLBACK.specs
  }

  return specs
}

function normalizeProduct(product: ProductRecord): NormalizedProduct {
  const itemNumber = product.itemNumber || 'GC-ST-420'
  const slug = slugifyItemNumber(itemNumber) || product.slug || 'gc-st-420'
  const categoryName = getCategoryName(product.category)
  const categorySlug = getCategorySlug(product.category)
  const applications = normalizeApplications(product.applications)
  const capacityLabel = getCapacityLabel(product.capacityRange)
  const material = toMaterialLabel(product.material)
  const mainImage = normalizeMedia(product.mainImage, product.name || GC_ST_420_FALLBACK.name)
  const gallery = Array.isArray(product.gallery) && product.gallery.length
    ? product.gallery
        .map((entry) =>
          normalizeMedia(
            isLooseObject(entry) ? entry.image : null,
            product.name || GC_ST_420_FALLBACK.name,
          ),
        )
        .slice(0, 8)
    : GC_ST_420_FALLBACK.gallery

  const baseProduct = {
    id: product.id ?? null,
    slug,
    name: product.name || GC_ST_420_FALLBACK.name,
    itemNumber,
    material,
    customizeMOQ:
      typeof product.customizeMOQ === 'string' && product.customizeMOQ.trim()
        ? product.customizeMOQ.trim()
        : GC_ST_420_FALLBACK.customizeMOQ,
    categoryName,
    categorySlug,
    capacityLabel,
    applications,
    mainImage,
    gallery,
    featureBullets: pickFeatureBullets(product, capacityLabel, applications),
    logoMethods: GC_ST_420_FALLBACK.logoMethods,
    finishOptions: GC_ST_420_FALLBACK.finishOptions,
    packagingOptions: GC_ST_420_FALLBACK.packagingOptions,
    relatedCategories: RELATED_CATEGORY_FALLBACKS,
    inquiryMessage: `I am interested in ${itemNumber}. Please share MOQ, lead time, branding options, and packaging details.`,
  }

  return {
    ...baseProduct,
    specs: buildSpecs(product, baseProduct),
  }
}

let payloadPromise: ReturnType<typeof getPayload> | null = null

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

export async function getAllProductSlugs() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      return [GC_ST_420_FALLBACK.slug]
    }

    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 0,
      pagination: false,
      select: {
        itemNumber: true,
      },
    })

    const slugs = Array.isArray(result.docs)
      ? result.docs
          .map((doc) =>
            slugifyItemNumber(
              isLooseObject(doc) && typeof doc.itemNumber === 'string' ? doc.itemNumber : '',
            ),
          )
          .filter(Boolean)
      : []

    return Array.from(new Set([...slugs, GC_ST_420_FALLBACK.slug]))
  } catch {
    return [GC_ST_420_FALLBACK.slug]
  }
}

export async function getProductBySlug(slug: string) {
  const normalizedSlug = slugifyItemNumber(slug)

  if (!normalizedSlug) {
    return null
  }

  try {
    const payload = await getPayloadClient()
    if (!payload) {
      if (normalizedSlug === GC_ST_420_FALLBACK.slug) {
        return GC_ST_420_FALLBACK
      }

      return null
    }

    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 2,
      pagination: false,
    })

    const docs = Array.isArray(result.docs) ? result.docs : []
    const matched = docs.find(
      (doc) =>
        isLooseObject(doc) &&
        slugifyItemNumber(typeof doc.itemNumber === 'string' ? doc.itemNumber : '') === normalizedSlug,
    )

    if (matched) {
      return normalizeProduct(matched as ProductRecord)
    }
  } catch {
    // Fall through to the hard-coded fallback.
  }

  if (normalizedSlug === GC_ST_420_FALLBACK.slug) {
    return GC_ST_420_FALLBACK
  }

  return null
}

export async function getProductIndex() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      return [GC_ST_420_FALLBACK]
    }

    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 1,
      pagination: false,
    })

    const docs = Array.isArray(result.docs)
      ? result.docs.filter(isLooseObject).map((doc) => normalizeProduct(doc as ProductRecord))
      : []

    if (!docs.length) {
      return [GC_ST_420_FALLBACK]
    }

    return docs
  } catch {
    return [GC_ST_420_FALLBACK]
  }
}
