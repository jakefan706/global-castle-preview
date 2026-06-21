import type { Metadata } from 'next'

import ResourcesPage from '../components/resources/ResourcesPage'

export const metadata: Metadata = {
  title: 'Resources | Global Castle',
  description:
    'Download live Global Castle catalogs, review compliance references, and access quick buyer support before your next drinkware sourcing inquiry.',
}

export default function ResourcesHubRoute() {
  return <ResourcesPage />
}
