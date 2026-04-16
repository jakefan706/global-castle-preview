import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
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
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'],
  },
  fields: [
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
