import type { BeforeListServerProps, BeforeListTableServerProps } from 'payload'

import MediaThumbnailBrowserClient from './MediaThumbnailBrowserClient'

type MediaDoc = {
  alt?: string
  filename?: string
  id?: number | string
  mimeType?: string
  sizes?: {
    card?: {
      height?: number
      url?: string
      width?: number
    }
    thumbnail?: {
      height?: number
      url?: string
      width?: number
    }
  }
  thumbnailURL?: string
  updatedAt?: string
  url?: string
  usageCount?: number
  usageDetails?: string[]
  width?: number
  height?: number
}

type BrowserProps = BeforeListServerProps | BeforeListTableServerProps

function getPreviewSource(doc: MediaDoc) {
  return (
    doc.url ||
    doc.sizes?.card?.url ||
    doc.sizes?.thumbnail?.url ||
    doc.thumbnailURL ||
    null
  )
}

function getPreviewDimensions(doc: MediaDoc) {
  if (typeof doc.width === 'number' && typeof doc.height === 'number') {
    return { height: doc.height, width: doc.width }
  }

  const cardWidth = doc.sizes?.card?.width
  const cardHeight = doc.sizes?.card?.height

  if (typeof cardWidth === 'number' && typeof cardHeight === 'number') {
    return { height: cardHeight, width: cardWidth }
  }

  const thumbWidth = doc.sizes?.thumbnail?.width
  const thumbHeight = doc.sizes?.thumbnail?.height

  if (typeof thumbWidth === 'number' && typeof thumbHeight === 'number') {
    return { height: thumbHeight, width: thumbWidth }
  }

  return {
    height: undefined,
    width: undefined,
  }
}

export default function MediaThumbnailBrowser({
  collectionSlug,
  data,
}: BrowserProps) {
  const docs = Array.isArray(data?.docs) ? (data.docs as MediaDoc[]) : []

  const gridItems = docs
    .map((doc) => {
      const previewURL = getPreviewSource(doc)

      if (!previewURL || !doc.id) {
        return null
      }

      const dimensions = getPreviewDimensions(doc)

      return {
        filename: doc.filename,
        id: doc.id,
        previewHeight: dimensions.height,
        previewWidth: dimensions.width,
        title: doc.alt || doc.filename || `Media ${doc.id}`,
        updatedAt: doc.updatedAt,
        url: previewURL,
        usageCount: typeof doc.usageCount === 'number' ? doc.usageCount : 0,
        usageDetails: doc.usageDetails,
      }
    })
    .filter(Boolean)

  return (
    <MediaThumbnailBrowserClient
      collectionSlug={collectionSlug}
      gridItems={gridItems}
      initialDocCount={docs.length}
    />
  )
}
