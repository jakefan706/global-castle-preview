import { APIError, type CollectionConfig } from 'payload'

import { findMediaUsage, summarizeMediaUsage } from '../lib/media-usage.ts'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'usageStatus', 'alt', 'updatedAt'],
    components: {
      views: {
        list: {
          Component: './app/(payload)/components/MediaListView#default',
        },
      },
    },
  },
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        const docID =
          typeof doc?.id === 'number' || typeof doc?.id === 'string' ? doc.id : null

        if (!docID) {
          return doc
        }

        const usage = summarizeMediaUsage(await findMediaUsage(req.payload, docID))

        return {
          ...doc,
          usageCount: usage.count,
          usageDetails: usage.details,
          usageEntries: usage.entries,
          usageStatus: usage.status,
        }
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const usage = await findMediaUsage(req.payload, id)

        if (!usage.length) {
          return
        }

        const summary = summarizeMediaUsage(usage).details.join('; ')

        throw new APIError(`This media file is currently in use. ${summary}`, 400)
      },
    ],
  },
  upload: {
    adminThumbnail: 'thumbnail',
    bulkUpload: true,
    displayPreview: true,
    // 图片自动生成多尺寸
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        position: 'centre',
      },
      {
        name: 'full',
        width: 1200,
        height: 1200,
        position: 'centre',
      },
    ],
    resizeOptions: {
      fit: 'inside',
      height: 2400,
      width: 2400,
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 82,
      },
    },
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'],
  },
  fields: [
    {
      name: 'usageNotice',
      type: 'ui',
      label: 'Usage',
      admin: {
        position: 'sidebar',
        components: {
          Field: './app/(payload)/components/MediaUsageNotice#default',
        },
      },
    },
    {
      name: 'usageStatus',
      type: 'text',
      virtual: true,
      label: 'Usage',
      admin: {
        readOnly: true,
        components: {
          Cell: './app/(payload)/components/MediaUsageStatusCell#default',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: '图片描述文字（SEO 和无障碍）',
      },
    },
  ],
}
