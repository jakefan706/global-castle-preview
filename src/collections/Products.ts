import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['mainImage', 'name', 'itemNumber', 'isPublished', 'category', 'material', 'featured'],
    components: {
      edit: {
        beforeDocumentControls: ['./app/(payload)/components/AdminDraftRecovery#default'],
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'itemNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Item Number',
      admin: {
        description: '产品编号，如 SS-1525',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Features',
      admin: {
        description: '产品卖点与特征说明，前台 Features 模块直接读取这里的内容。',
      },
    },
    {
      name: 'customizeMOQ',
      type: 'text',
      label: 'Min. Order',
      admin: {
        description: '详情页和产品卡片展示的起订量，例如 500pcs',
      },
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Image',
      admin: {
        description: 'Fallback uploader. If the quick image manager is unavailable, upload the main product image here.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: 'Fallback gallery uploader for additional product images.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },
    {
      name: 'productImagesManager',
      type: 'ui',
      label: 'Product Images',
      admin: {
        components: {
          Field: './app/(payload)/components/ProductImageManager#default',
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
      admin: {
        allowCreate: false,
      },
    },
    {
      name: 'material',
      type: 'select',
      label: 'Material',
      options: [
        { label: 'Stainless Steel', value: 'stainless-steel' },
        { label: 'Aluminum', value: 'aluminum' },
        { label: 'Plastic', value: 'plastic' },
        { label: 'Ceramic', value: 'ceramic' },
        { label: 'Glass', value: 'glass' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'specifications',
      type: 'richText',
      label: 'Technical Specifications',
      admin: {
        description: '前台 Technical specifications 模块直接读取这里的内容。',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Published',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: '关闭后仅在后台保留，不在前台产品页显示。',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: '首页推荐',
      },
    },
    {
      name: 'classic',
      type: 'checkbox',
      label: 'Classic',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: '产品卡片显示蓝色 CLASSIC 标签',
      },
    },
    {
      name: 'newArrival',
      type: 'checkbox',
      label: 'New',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: '产品卡片显示橙色 New 标签',
      },
    },
  ],
}
