'use client'

import { DefaultListView, useListDrawerContext, useListQuery } from '@payloadcms/ui'
import type { ListViewClientProps } from 'payload'

import MediaThumbnailBrowserClient from './MediaThumbnailBrowserClient'

type MediaDoc = {
  alt?: string
  filename?: string
  id?: number | string
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

function normalizeMediaDoc(doc: MediaDoc) {
  const previewURL =
    doc.url ||
    doc.sizes?.card?.url ||
    doc.sizes?.thumbnail?.url ||
    doc.thumbnailURL ||
    null

  if (!previewURL || !doc.id) {
    return null
  }

  return {
    filename: doc.filename,
    id: doc.id,
    previewHeight:
      (typeof doc.height === 'number' ? doc.height : undefined) ??
      doc.sizes?.card?.height ??
      doc.sizes?.thumbnail?.height,
    previewWidth:
      (typeof doc.width === 'number' ? doc.width : undefined) ??
      doc.sizes?.card?.width ??
      doc.sizes?.thumbnail?.width,
    title: doc.alt || doc.filename || `Media ${doc.id}`,
    updatedAt: doc.updatedAt,
    url: previewURL,
    usageCount: typeof doc.usageCount === 'number' ? doc.usageCount : 0,
    usageDetails: doc.usageDetails,
  }
}

export default function MediaListView(props: ListViewClientProps) {
  const { data } = useListQuery()
  const { isInDrawer } = useListDrawerContext()
  const docs = Array.isArray(data?.docs) ? (data.docs as MediaDoc[]) : []

  const serverItems = docs.map(normalizeMediaDoc).filter(Boolean)

  if (isInDrawer) {
    return <DefaultListView {...props} />
  }

  return (
    <>
      <MediaThumbnailBrowserClient
        collectionSlug={props.collectionSlug}
        gridItems={serverItems}
        initialDocCount={docs.length}
      />
      <DefaultListView {...props} />
    </>
  )
}
