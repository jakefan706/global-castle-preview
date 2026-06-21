import type { Payload } from 'payload'

import { DEFAULT_PRODUCT_CATEGORIES } from './default-product-categories.ts'

export async function ensureDefaultProductCategories(payload: Payload) {
  const existing = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: DEFAULT_PRODUCT_CATEGORIES.length,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const existingSlugs = new Set(
    Array.isArray(existing.docs)
      ? existing.docs
          .map((doc) => (typeof doc?.slug === 'string' ? doc.slug : null))
          .filter(Boolean)
      : [],
  )

  const missingCategories = DEFAULT_PRODUCT_CATEGORIES.filter(
    (category) => !existingSlugs.has(category.slug),
  )

  for (const category of missingCategories) {
    await payload.create({
      collection: 'categories',
      data: category,
    })
  }

  return missingCategories.length
}
