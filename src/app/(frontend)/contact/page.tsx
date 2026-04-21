import type { Metadata } from 'next'

import ContactPage from '../components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contact | Global Castle',
  description:
    'Start a B2B drinkware inquiry with Global Castle. Share product type, quantity, branding, packaging, and timing to begin a practical custom project discussion.',
}

export default function ContactRoute() {
  return <ContactPage />
}
