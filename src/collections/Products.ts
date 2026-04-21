import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'itemNumber', 'category', 'material', 'featured'],
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
      label: 'Description',
      admin: {
        description: '产品详细描述，支持图文混排，用于详情页叙事段落',
      },
    },
    {
      name: 'customizeMOQ',
      type: 'text',
      label: 'Customize MOQ',
      admin: {
        description: '详情页展示的定制起订量，例如 500pcs',
      },
    },
    // 图片
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      admin: {
        description: '多角度产品图片',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // 关联字段
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
    },
    {
      name: 'capacityRange',
      type: 'relationship',
      relationTo: 'capacity-ranges',
      label: 'Capacity Range',
    },
    {
      name: 'applications',
      type: 'relationship',
      relationTo: 'applications',
      hasMany: true,
      label: 'Applications',
    },
    // 选项字段
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
      name: 'priceRange',
      type: 'select',
      label: 'Price Range',
      options: [
        { label: 'Budget', value: 'budget' },
        { label: 'Mid-Range', value: 'mid-range' },
        { label: 'Premium', value: 'premium' },
      ],
    },
    {
      name: 'specifications',
      type: 'richText',
      label: 'Specifications',
      admin: {
        description: '规格参数表',
      },
    },
    // 标记
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
      name: 'newArrival',
      type: 'checkbox',
      label: 'New Arrival',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
