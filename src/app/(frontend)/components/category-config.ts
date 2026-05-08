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
    name: 'Stainless Steel Series',
    slug: 'stainless-steel-bottles',
    image: '/images/products/steel-bottles.jpg',
    description: 'Vacuum flasks, travel tumblers, and insulated formats built for high-volume private label programs.',
  },
  {
    name: 'Ceramic & Stoneware',
    slug: 'ceramic-mugs',
    image: '/images/products/ceramic-mugs.jpg',
    description: 'Retail-ready mugs, serving pieces, and glazed tabletop formats with strong decoration potential.',
  },
  {
    name: 'Glassware Essentials',
    slug: 'glass-bottles-mugs',
    image: '/images/products/glassware.jpg',
    description: 'Clean-lined glass bottles, mugs, and drink service pieces for contemporary lifestyle assortments.',
  },
  {
    name: 'Eco-friendly & Sustainable',
    slug: 'eco-friendly',
    image: '/images/products/plastic-cups.jpg',
    description: 'Material-conscious product directions designed to support reusable, lower-waste lifestyle collections.',
  },
  {
    name: 'Professional Tableware',
    slug: 'food-containers',
    image: '/images/products/tumblers.jpg',
    description: 'Dining-ready service pieces and practical kitchen formats developed for hospitality and retail buyers.',
  },
  {
    name: 'Gift Sets & Packaging',
    slug: 'accessories',
    image: '/images/products/gift-sets.jpg',
    description: 'Presentation-led bundle concepts, custom inserts, and packaging systems that sharpen shelf appeal.',
  },
]

export const FOOTER_PRODUCT_CATEGORIES: CategoryLink[] = [
  { name: 'Stainless Steel Series', slug: 'stainless-steel-bottles' },
  { name: 'Ceramic Tableware & Mugs', slug: 'ceramic-mugs' },
  { name: 'Glassware Collections', slug: 'glass-bottles-mugs' },
  { name: 'Dining & Kitchen Essentials', slug: 'food-containers' },
  { name: 'Eco-Friendly Solutions', slug: 'eco-friendly' },
  { name: 'Custom Gift Sets', slug: 'accessories' },
]

export function getCategoryHref(slug: string) {
  return `/products?category=${slug}`
}
