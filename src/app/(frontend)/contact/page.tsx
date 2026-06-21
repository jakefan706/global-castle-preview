import type { Metadata } from 'next'

import ContactPage from '../components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contact UrbanEco | Global Castle',
  description:
    'Start a sourcing program with UrbanEco. Share product specifications, customization goals, and volume requirements for premium drinkware, ceramics, and integrated tableware collections.',
}

export default function ContactRoute() {
  return <ContactPage />
}
