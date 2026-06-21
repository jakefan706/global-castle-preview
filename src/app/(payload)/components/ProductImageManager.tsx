'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { toast, useConfig, useField } from '@payloadcms/ui'

type MediaDoc = {
  id: number | string
  alt?: string | null
  filename?: string | null
  filesize?: number | null
  mimeType?: string | null
  sizes?: {
    card?: {
      url?: string | null
    }
    thumbnail?: {
      url?: string | null
    }
  } | null
  thumbnailURL?: string | null
  url?: string | null
}

type GalleryRow = {
  image: number | string | MediaDoc | null
}

type ManagedImage = {
  alt: string
  id: number | string
  url: string
}

type UploadQueueItem = {
  alt: string
  error?: string
  file: File
  id: string
  progress: number
  previewURL: string
  state: 'pending' | 'uploading' | 'success' | 'error'
  uploadedDoc?: ManagedImage
}

const MAX_FILE_SIZE_MB = 25
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

function getMediaID(value: number | string | MediaDoc | null | undefined): number | string | null {
  if (!value) return null
  if (typeof value === 'number' || typeof value === 'string') return value
  return value.id ?? null
}

function getMediaPreview(doc: MediaDoc | null | undefined) {
  if (!doc) return ''

  return doc.thumbnailURL || doc.sizes?.thumbnail?.url || doc.sizes?.card?.url || doc.url || ''
}

function getMediaAlt(doc: MediaDoc | null | undefined) {
  if (!doc) return ''

  return doc.alt || doc.filename || 'Product image'
}

function normalizeManagedImage(doc: MediaDoc) {
  return {
    alt: getMediaAlt(doc),
    id: doc.id,
    url: getMediaPreview(doc),
  }
}

function buildManagedImages(mainImageValue: unknown, galleryValue: unknown): ManagedImage[] {
  const images: ManagedImage[] = []
  const seen = new Set<number | string>()

  const mainDoc = typeof mainImageValue === 'object' && mainImageValue ? (mainImageValue as MediaDoc) : null
  const mainID = getMediaID(mainImageValue as number | string | MediaDoc | null | undefined)

  if (mainID !== null) {
    images.push({
      alt: getMediaAlt(mainDoc),
      id: mainID,
      url: getMediaPreview(mainDoc),
    })
    seen.add(mainID)
  }

  const galleryRows = Array.isArray(galleryValue) ? (galleryValue as GalleryRow[]) : []

  for (const row of galleryRows) {
    const imageValue = row?.image
    const imageDoc = typeof imageValue === 'object' && imageValue ? (imageValue as MediaDoc) : null
    const imageID = getMediaID(imageValue)

    if (imageID === null || seen.has(imageID)) continue

    images.push({
      alt: getMediaAlt(imageDoc),
      id: imageID,
      url: getMediaPreview(imageDoc),
    })
    seen.add(imageID)
  }

  return images
}

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`))

  if (!cookie) {
    return null
  }

  return decodeURIComponent(cookie.split('=').slice(1).join('='))
}

function buildPayloadHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  const csrfToken = getCookieValue('payload-csrf-token')

  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken
  }

  return headers
}

async function fetchMediaDoc(apiBase: string, id: number | string) {
  const response = await fetch(`${apiBase}/media/${id}`, {
    credentials: 'include',
    headers: buildPayloadHeaders(),
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`Unable to load uploaded image ${id}`)
  }

  return (await response.json()) as MediaDoc
}

function uploadMediaWithProgress(apiBase: string, file: File, alt: string, onProgress: (progress: number) => void) {
  return new Promise<MediaDoc>((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('POST', `${apiBase}/media`)
    request.withCredentials = true

    const headers = buildPayloadHeaders()
    Object.entries(headers).forEach(([key, value]) => {
      request.setRequestHeader(key, value)
    })

    request.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        onProgress(35)
        return
      }

      onProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)))
    }

    request.onerror = () => {
      reject(new Error(`Upload failed for ${file.name}`))
    }

    request.onload = () => {
      if (request.status < 200 || request.status >= 300) {
        reject(new Error(request.responseText || `Upload failed for ${file.name}`))
        return
      }

      try {
        const parsed = JSON.parse(request.responseText) as MediaDoc
        resolve(parsed)
      } catch {
        reject(new Error(`Upload succeeded but response for ${file.name} was invalid.`))
      }
    }

    const formData = new FormData()
    formData.append(
      '_payload',
      JSON.stringify({
        alt,
      }),
    )
    formData.append('file', file)
    request.send(formData)
  })
}

export default function ProductImageManager() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const hasHydratedInitialDocs = useRef(false)
  const [dragActive, setDragActive] = useState(false)
  const [queue, setQueue] = useState<UploadQueueItem[]>([])

  const { config } = useConfig()
  const mainImageField = useField<number | string | MediaDoc | null>({ path: 'mainImage' })
  const galleryField = useField<GalleryRow[]>({ path: 'gallery' })

  const managedImages = useMemo(
    () => buildManagedImages(mainImageField.value, galleryField.value),
    [galleryField.value, mainImageField.value],
  )

  const isUploading = queue.some((item) => item.state === 'pending' || item.state === 'uploading')

  const syncFields = (images: ManagedImage[]) => {
    const [primary, ...gallery] = images

    mainImageField.setValue(primary?.id ?? null)
    galleryField.setValue(gallery.map((image) => ({ image: image.id })))
  }

  useEffect(() => {
    if (hasHydratedInitialDocs.current) {
      return
    }

    const imagesNeedingHydration = managedImages.filter((image) => !image.url)

    if (!imagesNeedingHydration.length) {
      hasHydratedInitialDocs.current = true
      return
    }

    hasHydratedInitialDocs.current = true

    void (async () => {
      try {
        const hydrated = await Promise.all(
          managedImages.map(async (image) => {
            if (image.url) return image

            const doc = await fetchMediaDoc(config.routes.api, image.id)
            return normalizeManagedImage(doc)
          }),
        )

        syncFields(hydrated)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [config.routes.api, managedImages])

  useEffect(() => {
    return () => {
      queue.forEach((item) => {
        URL.revokeObjectURL(item.previewURL)
      })
    }
  }, [queue])

  const updateQueueItem = (id: string, updater: (item: UploadQueueItem) => UploadQueueItem) => {
    setQueue((current) => current.map((item) => (item.id === id ? updater(item) : item)))
  }

  const enqueueFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList)

    if (!files.length) {
      return
    }

    const invalidFile = files.find((file) => file.size > MAX_FILE_SIZE_BYTES)

    if (invalidFile) {
      toast.error(`Each image must be ${MAX_FILE_SIZE_MB}MB or smaller before upload.`)
      return
    }

    const queuedItems: UploadQueueItem[] = files.map((file, index) => ({
      alt: file.name.replace(/\.[^.]+$/, ''),
      file,
      id: `${Date.now()}-${index}-${file.name}`,
      previewURL: URL.createObjectURL(file),
      progress: 0,
      state: 'pending',
    }))

    setQueue((current) => [...current, ...queuedItems])

    const uploadedImages: ManagedImage[] = []

    for (const item of queuedItems) {
      updateQueueItem(item.id, (current) => ({
        ...current,
        error: undefined,
        progress: Math.max(current.progress, 2),
        state: 'uploading',
      }))

      try {
        const uploadedDoc = await uploadMediaWithProgress(config.routes.api, item.file, item.alt, (progress) => {
          updateQueueItem(item.id, (current) => ({
            ...current,
            progress,
            state: 'uploading',
          }))
        })

        const resolvedDoc = getMediaPreview(uploadedDoc)
          ? uploadedDoc
          : await fetchMediaDoc(config.routes.api, uploadedDoc.id)

        const normalized = normalizeManagedImage(resolvedDoc)
        uploadedImages.push(normalized)

        updateQueueItem(item.id, (current) => ({
          ...current,
          progress: 100,
          state: 'success',
          uploadedDoc: normalized,
        }))

        syncFields([...buildManagedImages(mainImageField.value, galleryField.value), normalized])
      } catch (error) {
        console.error(error)
        updateQueueItem(item.id, (current) => ({
          ...current,
          error: error instanceof Error ? error.message : 'Upload failed.',
          progress: current.progress || 0,
          state: 'error',
        }))
      }
    }

    if (uploadedImages.length) {
      toast.success(`${uploadedImages.length} image${uploadedImages.length > 1 ? 's' : ''} uploaded.`)
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)

    if (isUploading) {
      return
    }

    await enqueueFiles(event.dataTransfer.files)
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction

    if (nextIndex < 0 || nextIndex >= managedImages.length) return

    const nextImages = [...managedImages]
    ;[nextImages[index], nextImages[nextIndex]] = [nextImages[nextIndex], nextImages[index]]
    syncFields(nextImages)
  }

  const removeImage = (id: number | string) => {
    const nextImages = managedImages.filter((image) => image.id !== id)
    syncFields(nextImages)
  }

  const makePrimary = (id: number | string) => {
    const nextImages = [...managedImages]
    const index = nextImages.findIndex((image) => image.id === id)

    if (index <= 0) {
      return
    }

    const [selected] = nextImages.splice(index, 1)
    nextImages.unshift(selected)
    syncFields(nextImages)
  }

  return (
    <div className="gc-product-images">
      <div className="gc-product-images__header">
        <div>
          <h3>Product Images</h3>
          <p>
            Drag multiple images once, watch each upload progress, then mark one as the main image.
            The remaining images will fill the gallery automatically.
          </p>
        </div>
        <button
          type="button"
          className="btn btn--style-secondary btn--size-small"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Select Images'}
        </button>
      </div>

      <div
        className={`gc-product-images__dropzone${dragActive ? ' is-active' : ''}${isUploading ? ' is-disabled' : ''}`}
        onDragEnter={(event) => {
          event.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return
          setDragActive(false)
        }}
        onDragOver={(event) => {
          event.preventDefault()
        }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          multiple
          hidden
          onChange={async (event) => {
            if (!event.target.files?.length) return
            await enqueueFiles(event.target.files)
            event.target.value = ''
          }}
        />

        <strong>Drop product images here</strong>
        <span>
          Current intake limit: {MAX_FILE_SIZE_MB}MB per file. Oversized source photos are compressed
          on the server after upload.
        </span>
      </div>

      {queue.length ? (
        <div className="gc-product-images__queue">
          {queue.map((item) => (
            <article key={item.id} className={`gc-upload-queue__item is-${item.state}`}>
              <div className="gc-upload-queue__thumb">
                <img src={item.uploadedDoc?.url || item.previewURL} alt={item.alt} />
              </div>
              <div className="gc-upload-queue__body">
                <div className="gc-upload-queue__meta">
                  <strong>{item.alt}</strong>
                  <span>
                    {item.state === 'pending'
                      ? 'Queued'
                      : item.state === 'uploading'
                        ? `Uploading ${item.progress}%`
                        : item.state === 'success'
                          ? 'Uploaded'
                          : 'Upload failed'}
                  </span>
                </div>
                <div className="gc-upload-queue__bar">
                  <span style={{ width: `${item.progress}%` }} />
                </div>
                {item.error ? <p className="gc-upload-queue__error">{item.error}</p> : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {managedImages.length ? (
        <div className="gc-product-images__grid">
          {managedImages.map((image, index) => (
            <article key={String(image.id)} className="gc-product-images__card">
              <div className="gc-product-images__preview">
                {image.url ? (
                  <img src={image.url} alt={image.alt || `Product image ${index + 1}`} />
                ) : (
                  <div className="gc-product-images__placeholder">Loading preview…</div>
                )}
                {index === 0 ? <span className="gc-product-images__badge">Main image</span> : null}
              </div>

              <div className="gc-product-images__meta">
                <p>{image.alt || `Image ${index + 1}`}</p>
              </div>

              <div className="gc-product-images__actions">
                <button
                  type="button"
                  className="btn btn--style-pill btn--size-small"
                  onClick={() => makePrimary(image.id)}
                  disabled={index === 0}
                >
                  Set as Main
                </button>
                <button
                  type="button"
                  className="btn btn--style-pill btn--size-small"
                  onClick={() => moveImage(index, -1)}
                  disabled={index === 0}
                >
                  Move Up
                </button>
                <button
                  type="button"
                  className="btn btn--style-pill btn--size-small"
                  onClick={() => moveImage(index, 1)}
                  disabled={index === managedImages.length - 1}
                >
                  Move Down
                </button>
                <button
                  type="button"
                  className="btn btn--style-secondary btn--size-small"
                  onClick={() => removeImage(image.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="gc-product-images__empty">
          No images yet. Upload at least one image to set the main product visual.
        </p>
      )}
    </div>
  )
}
