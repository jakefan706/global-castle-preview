import type { Metadata } from 'next'

import AboutPage from '../components/about/AboutPage'

export const metadata: Metadata = {
  title: 'About Us | Global Castle',
  description:
    'Learn about Global Castle as a B2B drinkware manufacturer and OEM partner, including production capability, certifications, export experience, and factory support for custom programs.',
}

export default function AboutRoute() {
  return <AboutPage />
}
