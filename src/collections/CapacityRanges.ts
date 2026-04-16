import type { CollectionConfig } from 'payload'

export const CapacityRanges: CollectionConfig = {
  slug: 'capacity-ranges',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'minMl', 'maxMl'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Range Name',
    },
    {
      name: 'minMl',
      type: 'number',
      label: 'Min (ml)',
    },
    {
      name: 'maxMl',
      type: 'number',
      label: 'Max (ml)',
    },
  ],
}
