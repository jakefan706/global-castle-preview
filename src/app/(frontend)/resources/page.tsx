import type { Metadata } from 'next'

import ResourcesPage from '../components/resources/ResourcesPage'

export const metadata: Metadata = {
  title: 'Resources | Global Castle',
  description:
    'Explore Global Castle resources for custom drinkware sourcing, including branding guidance, MOQ and packaging planning, certifications, FAQs, and quarterly brochure slots.',
}

export default function ResourcesHubRoute() {
  return <ResourcesPage />
}
