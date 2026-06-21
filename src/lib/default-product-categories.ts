export type DefaultProductCategory = {
  featuredOnHomepage?: boolean
  name: string
  slug: string
  sortOrder: number
}

export const DEFAULT_PRODUCT_CATEGORIES: DefaultProductCategory[] = [
  {
    name: 'Stainless Steel Bottles',
    slug: 'stainless-steel-bottles',
    sortOrder: 1,
    featuredOnHomepage: true,
  },
  {
    name: 'Stainless Steel Tumblers',
    slug: 'stainless-steel-tumblers',
    sortOrder: 2,
    featuredOnHomepage: true,
  },
  {
    name: 'Plastic Bottles',
    slug: 'plastic-bottles',
    sortOrder: 3,
    featuredOnHomepage: true,
  },
  {
    name: 'Plastic Cup & Tumbler',
    slug: 'plastic-cup-tumbler',
    sortOrder: 4,
  },
  {
    name: 'Aluminum Bottles',
    slug: 'aluminum-bottles',
    sortOrder: 5,
  },
  {
    name: 'Ceramic Mugs',
    slug: 'ceramic-mugs',
    sortOrder: 6,
    featuredOnHomepage: true,
  },
  {
    name: 'Glass Bottles & Mugs',
    slug: 'glass-bottles-mugs',
    sortOrder: 7,
    featuredOnHomepage: true,
  },
  {
    name: 'Food Containers',
    slug: 'food-containers',
    sortOrder: 8,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    sortOrder: 9,
    featuredOnHomepage: true,
  },
  {
    name: 'Eco-Friendly',
    slug: 'eco-friendly',
    sortOrder: 10,
  },
  {
    name: 'TECH',
    slug: 'tech',
    sortOrder: 11,
  },
]
