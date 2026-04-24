import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['coverImage', 'title', 'category', 'publishedDate', 'featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'summary',
      type: 'text',
      label: 'Summary',
      admin: {
        description: '摘要，在列表页展示',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Industry Guide', value: 'industry-guide' },
        { label: 'Quality & Testing', value: 'quality-testing' },
        { label: 'Company News', value: 'company-news' },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
