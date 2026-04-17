export type CategoryLink = {
  name: string
  slug: string
}

export type FeaturedCategoryCard = CategoryLink & {
  image: string
  description: string
}

export const ALL_PRODUCT_CATEGORIES: CategoryLink[] = [
  { name: 'Stainless Steel Bottles', slug: 'stainless-steel-bottles' },
  { name: 'Stainless Steel Tumblers', slug: 'stainless-steel-tumblers' },
  { name: 'Plastic Bottles', slug: 'plastic-bottles' },
  { name: 'Plastic Cup & Tumbler', slug: 'plastic-cup-tumbler' },
  { name: 'Aluminum Bottles', slug: 'aluminum-bottles' },
  { name: 'Ceramic Mugs', slug: 'ceramic-mugs' },
  { name: 'Glass Bottles & Mugs', slug: 'glass-bottles-mugs' },
  { name: 'Food Containers', slug: 'food-containers' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Eco-Friendly', slug: 'eco-friendly' },
  { name: 'TECH', slug: 'tech' },
]

export const FEATURED_CATEGORY_CARDS: FeaturedCategoryCard[] = [
  {
    name: 'Stainless Steel Bottles',
    slug: 'stainless-steel-bottles',
    image: '/images/products/steel-bottles.jpg',
    description: 'Double-wall vacuum insulated options for gifting, retail, and private label.',
  },
  {
    name: 'Stainless Steel Tumblers',
    slug: 'stainless-steel-tumblers',
    image: '/images/products/tumblers.jpg',
    description: 'Popular tumbler formats for coffee chains, subscription boxes, and promotions.',
  },
  {
    name: 'Ceramic Mugs',
    slug: 'ceramic-mugs',
    image: '/images/products/ceramic-mugs.jpg',
    description: 'Classic ceramic drinkware with dependable printability and gifting appeal.',
  },
  {
    name: 'Glass Bottles & Mugs',
    slug: 'glass-bottles-mugs',
    image: '/images/products/glassware.jpg',
    description: 'Premium glass drinkware for modern lifestyle, tea, and cafe-focused collections.',
  },
  {
    name: 'Plastic Bottles',
    slug: 'plastic-bottles',
    image: '/images/products/plastic-cups.jpg',
    description: 'Lightweight BPA-free options for events, kids ranges, and outdoor promotions.',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: '/images/products/gift-sets.jpg',
    description: 'Caps, sleeves, packaging add-ons, and bundled sets that complete the offer.',
  },
]

const FOOTER_PRODUCT_CATEGORY_SLUGS = new Set([
  'stainless-steel-bottles',
  'stainless-steel-tumblers',
  'plastic-bottles',
  'ceramic-mugs',
  'glass-bottles-mugs',
  'accessories',
])

export const FOOTER_PRODUCT_CATEGORIES = ALL_PRODUCT_CATEGORIES.filter((category) =>
  FOOTER_PRODUCT_CATEGORY_SLUGS.has(category.slug),
)

export function getCategoryHref(slug: string) {
  return `/products?category=${slug}`
}
