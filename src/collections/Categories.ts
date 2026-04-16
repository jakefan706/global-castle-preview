import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sortOrder'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
