import type { Payload } from 'payload'

type UsageEntry = {
  id: number | string
  label: string
  type: 'product-main' | 'product-gallery' | 'blog-cover'
}

export type MediaUsageSummary = {
  details: string[]
  entries: UsageEntry[]
  isUsed: boolean
  status: string
  count: number
}

function escapeHTML(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export async function findMediaUsage(payload: Payload, mediaID: number | string) {
  const idString = String(mediaID)
  const usage: UsageEntry[] = []

  const [productsResult, blogPostsResult] = await Promise.all([
    payload.find({
      collection: 'products',
      depth: 0,
      limit: 200,
      pagination: false,
      overrideAccess: true,
      select: {
        name: true,
        itemNumber: true,
        mainImage: true,
        gallery: true,
      },
    }),
    payload.find({
      collection: 'blog-posts',
      depth: 0,
      limit: 200,
      pagination: false,
      overrideAccess: true,
      select: {
        title: true,
        coverImage: true,
      },
    }),
  ])

  for (const doc of productsResult.docs) {
    const docID =
      typeof doc?.id === 'number' || typeof doc?.id === 'string' ? doc.id : null

    if (docID == null) {
      continue
    }

    const title =
      typeof doc?.name === 'string' && doc.name.trim()
        ? doc.name.trim()
        : typeof doc?.itemNumber === 'string' && doc.itemNumber.trim()
          ? doc.itemNumber.trim()
          : `Product ${docID}`

    if (String(doc?.mainImage) === idString) {
      usage.push({
        id: docID,
        label: title,
        type: 'product-main',
      })
    }

    const gallery = Array.isArray(doc?.gallery) ? doc.gallery : []
    const isInGallery = gallery.some((row) => {
      const imageValue =
        row && typeof row === 'object' && 'image' in row
          ? (row as { image?: unknown }).image
          : null

      return String(imageValue) === idString
    })

    if (isInGallery) {
      usage.push({
        id: docID,
        label: title,
        type: 'product-gallery',
      })
    }
  }

  for (const doc of blogPostsResult.docs) {
    const docID =
      typeof doc?.id === 'number' || typeof doc?.id === 'string' ? doc.id : null

    if (docID == null) {
      continue
    }

    if (String(doc?.coverImage) !== idString) {
      continue
    }

    usage.push({
      id: docID,
      label:
        typeof doc?.title === 'string' && doc.title.trim() ? doc.title.trim() : `Blog ${docID}`,
      type: 'blog-cover',
    })
  }

  return usage
}

export function summarizeMediaUsage(usage: UsageEntry[]): MediaUsageSummary {
  const details = usage.map((entry) => {
    if (entry.type === 'product-main') return `Product main image: ${entry.label}`
    if (entry.type === 'product-gallery') return `Product gallery: ${entry.label}`
    return `Blog cover: ${entry.label}`
  })

  return {
    details,
    entries: usage,
    isUsed: usage.length > 0,
    status: usage.length ? `Used by ${usage.length} entr${usage.length === 1 ? 'y' : 'ies'}` : 'Unused',
    count: usage.length,
  }
}

export function formatMediaUsageHTML(usage: UsageEntry[]) {
  if (!usage.length) {
    return '<p style="margin:0;color:#2f6f48;">This file is not currently used by any product or blog entry.</p>'
  }

  const items = usage
    .map((entry) => {
      const prefix =
        entry.type === 'product-main'
          ? 'Product main image'
          : entry.type === 'product-gallery'
            ? 'Product gallery'
            : 'Blog cover'

      return `<li><strong>${prefix}:</strong> ${escapeHTML(entry.label)}</li>`
    })
    .join('')

  return `<div style="padding:12px 14px;border:1px solid #f1cf9b;background:#fff7ea;border-radius:10px;"><p style="margin:0 0 8px;font-weight:600;color:#8a4b00;">This file is currently in use.</p><ul style="margin:0;padding-left:18px;color:#5d3a00;">${items}</ul></div>`
}
