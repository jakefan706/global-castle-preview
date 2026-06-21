import Image from 'next/image'
import type { ReactNode } from 'react'

type LooseObject = Record<string, unknown>

function isLooseObject(value: unknown): value is LooseObject {
  return typeof value === 'object' && value !== null
}

function collectText(node: unknown): string {
  if (!isLooseObject(node)) {
    return ''
  }

  const directText = typeof node.text === 'string' ? node.text : ''
  const childText = Array.isArray(node.children)
    ? node.children.map((child) => collectText(child)).join('')
    : ''

  return `${directText}${childText}`
}

function renderChildren(children: unknown[], keyPrefix: string) {
  return children.map((child, index) => renderNode(child, `${keyPrefix}-${index}`))
}

function getUploadMedia(value: unknown) {
  if (!isLooseObject(value)) {
    return null
  }

  const sizes = isLooseObject(value.sizes) ? value.sizes : null
  const full = sizes && isLooseObject(sizes.full) ? sizes.full : null
  const card = sizes && isLooseObject(sizes.card) ? sizes.card : null
  const thumbnail = sizes && isLooseObject(sizes.thumbnail) ? sizes.thumbnail : null

  const url =
    (typeof value.url === 'string' ? value.url : null) ||
    (full && typeof full.url === 'string' ? full.url : null) ||
    (card && typeof card.url === 'string' ? card.url : null) ||
    (thumbnail && typeof thumbnail.url === 'string' ? thumbnail.url : null)

  if (!url) {
    return null
  }

  return {
    alt:
      typeof value.alt === 'string' && value.alt.trim() ? value.alt.trim() : 'Article image',
    height: typeof value.height === 'number' ? value.height : undefined,
    width: typeof value.width === 'number' ? value.width : undefined,
    url,
  }
}

function renderNode(node: unknown, key: string): ReactNode {
  if (!isLooseObject(node)) {
    return null
  }

  const type = typeof node.type === 'string' ? node.type : ''
  const children = Array.isArray(node.children) ? node.children : []

  if (type === 'text') {
    const text = typeof node.text === 'string' ? node.text : ''

    if (!text) {
      return null
    }

    let content: ReactNode = text

    if (node.bold === true) {
      content = <strong key={`${key}-bold`}>{content}</strong>
    }

    if (node.italic === true) {
      content = <em key={`${key}-italic`}>{content}</em>
    }

    if (node.underline === true) {
      content = <span key={`${key}-underline`} className="underline">{content}</span>
    }

    if (node.strikethrough === true) {
      content = <span key={`${key}-strike`} className="line-through">{content}</span>
    }

    return <>{content}</>
  }

  if (type === 'linebreak') {
    return <br key={key} />
  }

  if (type === 'link') {
    const href = typeof node.url === 'string' ? node.url : '#'
    const isExternal = /^https?:\/\//.test(href)

    return (
      <a
        key={key}
        href={href}
        className="text-[#0c7276] underline decoration-[#7bb8ba] underline-offset-4 transition-colors duration-200 hover:text-[#095d60]"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
      >
        {renderChildren(children, key)}
      </a>
    )
  }

  if (type === 'list') {
    const ListTag = node.listType === 'number' ? 'ol' : 'ul'

    return (
      <ListTag
        key={key}
        className={
          ListTag === 'ol'
            ? 'list-decimal space-y-3 pl-6'
            : 'list-disc space-y-3 pl-6'
        }
      >
        {renderChildren(children, key)}
      </ListTag>
    )
  }

  if (type === 'listitem') {
    return <li key={key}>{renderChildren(children, key)}</li>
  }

  if (type === 'quote') {
    return (
      <blockquote
        key={key}
        className="border-l-4 border-[#0c7276] bg-[#f3f8f8] px-5 py-4 text-lg leading-8 text-[#244244]"
      >
        {renderChildren(children, key)}
      </blockquote>
    )
  }

  if (type === 'heading') {
    const tag =
      node.tag === 'h1' || node.tag === 'h2' || node.tag === 'h3' || node.tag === 'h4'
        ? node.tag
        : 'h2'

    if (tag === 'h1') {
      return (
        <h1 key={key} className="text-4xl font-semibold tracking-[-0.04em] text-[#13232c]">
          {renderChildren(children, key)}
        </h1>
      )
    }

    if (tag === 'h2') {
      return (
        <h2 key={key} className="text-3xl font-semibold tracking-[-0.04em] text-[#13232c]">
          {renderChildren(children, key)}
        </h2>
      )
    }

    if (tag === 'h3') {
      return (
        <h3 key={key} className="text-2xl font-semibold tracking-[-0.03em] text-[#13232c]">
          {renderChildren(children, key)}
        </h3>
      )
    }

    return (
      <h4 key={key} className="text-xl font-semibold tracking-[-0.02em] text-[#13232c]">
        {renderChildren(children, key)}
      </h4>
    )
  }

  if (type === 'paragraph') {
    const textOnly = collectText(node).trim()

    if (!textOnly && children.length === 0) {
      return null
    }

    return (
      <p key={key} className="text-base leading-8 text-[#425563]">
        {renderChildren(children, key)}
      </p>
    )
  }

  if (type === 'upload') {
    const media = getUploadMedia(node.value)

    if (!media) {
      return null
    }

    const width = media.width && media.width > 0 ? media.width : 1200
    const height = media.height && media.height > 0 ? media.height : 800

    return (
      <figure key={key} className="flex justify-center overflow-hidden rounded-[4px] bg-[#eef4f7] py-2">
        <Image
          src={media.url}
          alt={media.alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="max-w-[90%] object-contain"
          style={{
            height: 'auto',
            width: 'auto',
          }}
        />
      </figure>
    )
  }

  return children.length ? <div key={key}>{renderChildren(children, key)}</div> : null
}

export default function BlogRichText({ value }: { value: unknown }) {
  if (!isLooseObject(value) || !isLooseObject(value.root) || !Array.isArray(value.root.children)) {
    return (
      <p className="text-base leading-8 text-[#425563]">
        Article content is being prepared.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {value.root.children.map((node, index) => renderNode(node, `root-${index}`))}
    </div>
  )
}
