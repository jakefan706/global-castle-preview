'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type GridItem = {
  filename?: string
  id: number | string
  previewHeight?: number
  previewWidth?: number
  title: string
  updatedAt?: string
  usageCount: number
  usageDetails?: string[]
  url: string
} | null

type MediaAPIItem = {
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

function formatUpdatedAt(value: string | undefined) {
  if (!value) return ''

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function normalizeMediaDoc(doc: MediaAPIItem): GridItem {
  const previewURL =
    doc.url ||
    doc.sizes?.card?.url ||
    doc.sizes?.thumbnail?.url ||
    doc.thumbnailURL ||
    null

  if (!previewURL || !doc.id) {
    return null
  }

  const previewWidth =
    (typeof doc.width === 'number' ? doc.width : undefined) ??
    doc.sizes?.card?.width ??
    doc.sizes?.thumbnail?.width

  const previewHeight =
    (typeof doc.height === 'number' ? doc.height : undefined) ??
    doc.sizes?.card?.height ??
    doc.sizes?.thumbnail?.height

  return {
    filename: doc.filename,
    id: doc.id,
    previewHeight,
    previewWidth,
    title: doc.alt || doc.filename || `Media ${doc.id}`,
    updatedAt: doc.updatedAt,
    url: previewURL,
    usageCount: typeof doc.usageCount === 'number' ? doc.usageCount : 0,
    usageDetails: doc.usageDetails,
  }
}

function getAPIPath(pathname: string) {
  const index = pathname.indexOf('/admin')

  if (index === -1) {
    return '/api/media'
  }

  const basePath = pathname.slice(0, index) || ''
  return `${basePath}/api/media`
}

export default function MediaThumbnailBrowserClient({
  collectionSlug,
  gridItems,
  initialDocCount,
}: {
  collectionSlug: string
  gridItems: GridItem[]
  initialDocCount: number
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hydratedItems, setHydratedItems] = useState<Exclude<GridItem, null>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const serverItems = useMemo(
    () => gridItems.filter(Boolean) as Exclude<GridItem, null>[],
    [gridItems],
  )

  useEffect(() => {
    if (serverItems.length > 0) {
      setHydratedItems(serverItems)
      return
    }

    const controller = new AbortController()
    const fetchDocs = async () => {
      setIsLoading(true)

      try {
        const params = new URLSearchParams(searchParams.toString())

        if (!params.has('limit')) {
          params.set('limit', '50')
        }

        if (!params.has('depth')) {
          params.set('depth', '1')
        }

        if (!params.has('sort')) {
          params.set('sort', '-updatedAt')
        }

        const response = await fetch(`${getAPIPath(pathname)}?${params.toString()}`, {
          credentials: 'same-origin',
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load media: ${response.status}`)
        }

        const payload = (await response.json()) as {
          docs?: MediaAPIItem[]
        }

        const nextItems = Array.isArray(payload.docs)
          ? payload.docs.map(normalizeMediaDoc).filter(Boolean)
          : []

        setHydratedItems(nextItems as Exclude<GridItem, null>[])
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        console.error('Unable to hydrate media thumbnails', error)
        setHydratedItems([])
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchDocs()

    return () => {
      controller.abort()
    }
  }, [pathname, searchParams, serverItems])

  useEffect(() => {
    const tableWrap = document.querySelector('.collection-list .table-wrap') as HTMLElement | null

    if (!tableWrap) {
      return
    }

    if (viewMode === 'grid') {
      tableWrap.style.display = 'none'
      return () => {
        tableWrap.style.display = ''
      }
    }

    tableWrap.style.display = ''
    return () => {
      tableWrap.style.display = ''
    }
  }, [viewMode, hydratedItems.length, initialDocCount])

  const canRenderGrid = hydratedItems.length > 0

  return (
    <section className="gc-media-browser" data-view-mode={viewMode}>
      <div className="gc-media-browser__header">
        <div>
          <p className="gc-media-browser__eyebrow">Media Library</p>
          <h2 className="gc-media-browser__title">Grid and list views</h2>
          <p className="gc-media-browser__subtitle">
            Thumbnail cards scale by the long edge so the full image stays visible.
          </p>
        </div>
        <div className="gc-media-browser__controls">
          <p className="gc-media-browser__meta">
            {canRenderGrid
              ? `${hydratedItems.length} preview${hydratedItems.length === 1 ? '' : 's'} on this page`
              : isLoading
                ? 'Loading thumbnails...'
                : initialDocCount > 0
                  ? 'Preparing thumbnails...'
                  : 'No media on this page'}
          </p>
          <div className="gc-media-browser__toggle" role="tablist" aria-label="Media view mode">
            <button
              type="button"
              className={viewMode === 'grid' ? 'is-active' : ''}
              onClick={() => setViewMode('grid')}
              disabled={!canRenderGrid}
            >
              Grid
            </button>
            <button
              type="button"
              className={viewMode === 'list' ? 'is-active' : ''}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        canRenderGrid ? (
          <div className="gc-media-browser__grid">
            {hydratedItems.map((doc) => {
              const usageLabel = doc.usageCount ? `Used by ${doc.usageCount}` : 'Unused'

              return (
                <Link
                  key={String(doc.id)}
                  href={`/admin/collections/${collectionSlug}/${doc.id}`}
                  className="gc-media-browser__card"
                  title={
                    Array.isArray(doc.usageDetails) && doc.usageDetails.length
                      ? doc.usageDetails.join('\n')
                      : usageLabel
                  }
                >
                  <div className="gc-media-browser__image-frame">
                    <div className="gc-media-browser__image-wrap">
                      <img src={doc.url} alt={doc.title} className="gc-media-browser__image" />
                      <span
                        className={`gc-media-usage-pill${doc.usageCount ? ' is-used' : ' is-unused'}`}
                      >
                        {doc.usageCount ? `Used (${doc.usageCount})` : 'Unused'}
                      </span>
                    </div>
                  </div>
                  <div className="gc-media-browser__body">
                    <p className="gc-media-browser__name">{doc.title}</p>
                    <p className="gc-media-browser__caption">
                      {doc.filename || 'Untitled file'}
                      {doc.updatedAt ? ` · ${formatUpdatedAt(doc.updatedAt)}` : ''}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="gc-media-browser__list-note">
            {isLoading
              ? 'Thumbnail view is loading. The list remains available below.'
              : 'Thumbnail preview is unavailable for this page, so the native list stays visible below.'}
          </div>
        )
      ) : (
        <div className="gc-media-browser__list-note">
          Native table view is active below. Switch back to Grid for thumbnail cards.
        </div>
      )}
    </section>
  )
}
