import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Certification Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'certificateImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Certificate Image',
      admin: {
        description: '证书扫描件（可选）',
      },
    },
  ],
}
