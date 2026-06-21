import type { UIFieldServerProps } from 'payload'

import { findMediaUsage, formatMediaUsageHTML } from '@/lib/media-usage'

export default async function MediaUsageNotice({ id, payload }: UIFieldServerProps) {
  if (!id) {
    return null
  }

  if (!payload) {
    return null
  }

  const usage = await findMediaUsage(payload, String(id))

  return (
    <div
      className="gc-media-usage-notice"
      dangerouslySetInnerHTML={{ __html: formatMediaUsageHTML(usage) }}
    />
  )
}
