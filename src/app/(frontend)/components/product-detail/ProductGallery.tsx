'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import Image from 'next/image'

type GalleryImage = {
  alt: string
  url: string
}

export default function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[]
  title: string
}) {
  const gallery = images.length ? images : [{ alt: title, url: '/images/products/tumblers.jpg' }]
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [transitionImage, setTransitionImage] = useState<GalleryImage | null>(null)
  const [lightboxTransitionImage, setLightboxTransitionImage] = useState<GalleryImage | null>(null)
  const activeImage = gallery[activeIndex] || gallery[0]
  const totalImages = gallery.length

  const selectImage = (index: number, animateMain = false, animateLightbox = false) => {
    if (index === activeIndex) return

    if (animateLightbox) {
      setLightboxTransitionImage(activeImage)
    }

    if (animateMain) {
      setTransitionImage(activeImage)
    }

    setActiveIndex(index)
  }

  const goToPrevious = (animateLightbox = false) => {
    selectImage((activeIndex - 1 + totalImages) % totalImages, false, animateLightbox)
  }

  const goToNext = (animateLightbox = false) => {
    selectImage((activeIndex + 1) % totalImages, false, animateLightbox)
  }

  const handleLightboxKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setLightboxOpen(false)
    }

    if (event.key === 'ArrowLeft') {
      selectImage((activeIndex - 1 + totalImages) % totalImages, false, true)
    }

    if (event.key === 'ArrowRight') {
      selectImage((activeIndex + 1) % totalImages, false, true)
    }
  })

  useEffect(() => {
    if (!lightboxOpen) return

    window.addEventListener('keydown', handleLightboxKeyDown)

    return () => window.removeEventListener('keydown', handleLightboxKeyDown)
  }, [lightboxOpen])

  useEffect(() => {
    if (!transitionImage) return

    const timer = window.setTimeout(() => {
      setTransitionImage(null)
    }, 420)

    return () => window.clearTimeout(timer)
  }, [transitionImage])

  useEffect(() => {
    if (!lightboxTransitionImage) return

    const timer = window.setTimeout(() => {
      setLightboxTransitionImage(null)
    }, 520)

    return () => window.clearTimeout(timer)
  }, [lightboxTransitionImage])

  const handleThumbnailSelect = (index: number) => {
    selectImage(index, true)
  }

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-[4px] bg-[#eef4f7] shadow-[0_18px_44px_rgba(12,27,48,0.09)]"
          aria-label={`Open enlarged view of ${activeImage.alt}`}
        >
          {transitionImage ? (
            <div className="absolute inset-0">
              <Image
                src={transitionImage.url}
                alt={transitionImage.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div key={activeImage.url} className="gc-gallery-main-fade absolute inset-0">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#081320]/18 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#33414e] opacity-0 shadow-[0_10px_24px_rgba(12,27,48,0.12)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>Click to enlarge</span>
          </div>
        </button>

        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8">
          {gallery.slice(0, 8).map((image, index) => {
            const selected = index === activeIndex

            return (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => handleThumbnailSelect(index)}
                className={`group relative aspect-square cursor-pointer overflow-hidden rounded-[4px] border transition-all duration-250 ${
                  selected
                    ? 'border-[#00868b] shadow-[0_0_0_3px_rgba(0, 134, 139,0.18)]'
                    : 'border-[#dde6ee] bg-[#f3f7fa] hover:-translate-y-0.5 hover:border-[#81bfc1] hover:shadow-[0_10px_22px_rgba(12,27,48,0.08)]'
                }`}
                aria-label={`Show image ${index + 1} of ${gallery.length}`}
                aria-pressed={selected}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 10vw, 22vw"
                  className={`object-cover transition-transform duration-250 ${
                    selected ? 'scale-[1.08]' : 'scale-[1.06] group-hover:scale-[1.11]'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#081320]/82 px-4 py-8 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} enlarged image`}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/14 text-white transition-colors hover:bg-white/24"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close enlarged image"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div
            className="relative h-[min(82vh,920px)] w-[min(92vw,920px)] overflow-hidden rounded-[10px] bg-[#f1f5f8] shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => goToPrevious(true)}
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#081320]/42 text-white transition-all duration-200 hover:bg-[#081320]/60"
              aria-label="Show previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => goToNext(true)}
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#081320]/42 text-white transition-all duration-200 hover:bg-[#081320]/60"
              aria-label="Show next image"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div className="absolute left-5 top-5 z-10 rounded-full bg-[#081320]/42 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/92">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
            </div>

            {lightboxTransitionImage ? (
              <div className="absolute inset-0">
                <Image
                  src={lightboxTransitionImage.url}
                  alt={lightboxTransitionImage.alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                />
              </div>
            ) : null}

            <div key={`${activeImage.url}-lightbox`} className="gc-gallery-crossfade absolute inset-0">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
