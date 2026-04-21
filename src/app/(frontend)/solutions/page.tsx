import type { Metadata } from 'next'

import SolutionsHubPage from '../components/solutions/SolutionsHubPage'

export const metadata: Metadata = {
  title: 'Custom Drinkware Solutions | Global Castle',
  description:
    'Explore Global Castle custom drinkware solutions for distributors and brands, including private label, custom branding, packaging, OEM/ODM development, and delivery coordination.',
}

export default function SolutionsPage() {
  return <SolutionsHubPage />
}
