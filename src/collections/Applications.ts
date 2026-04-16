import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Application Name',
    },
  ],
}
