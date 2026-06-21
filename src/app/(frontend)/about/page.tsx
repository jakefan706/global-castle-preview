import type { Metadata } from 'next'

import AboutPage from '../components/about/AboutPage'

export const metadata: Metadata = {
  title: 'About UrbanEco | Global Castle',
  description:
    'Learn about UrbanEco as a B2B drinkware and tableware manufacturer, including production capability, compliance focus, export experience, and factory support for custom programs.',
}

export default function AboutRoute() {
  return <AboutPage />
}
