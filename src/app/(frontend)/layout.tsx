import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Global Castle Industrial Co., Ltd. | B2B Drinkware Manufacturer',
  description:
    'Professional B2B manufacturer of stainless steel bottles, tumblers, aluminum bottles, and custom drinkware. Serving global gift distributors, wholesalers, and brands.',
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
