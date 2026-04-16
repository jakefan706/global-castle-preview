import type { CollectionConfig } from 'payload'

export const InquirySubmissions: CollectionConfig = {
  slug: 'inquiry-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'country', 'createdAt'],
  },
  // 询盘记录不允许通过 API 公开读取
  access: {
    read: ({ req }) => !!req.user,
    create: () => true, // 允许前端提交
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
    },
    {
      name: 'productInterest',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Product Interest',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'sourceProduct',
      type: 'relationship',
      relationTo: 'products',
      label: 'Source Product',
      admin: {
        description: '从产品详情页发起的询盘会自动关联产品',
      },
    },
  ],
}
