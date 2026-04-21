import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const plusJakartaSans = localFont({
  src: [
    {
      path: '../fonts/PlusJakartaSans-400.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PlusJakartaSans-500.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PlusJakartaSans-600.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/PlusJakartaSans-700.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/PlusJakartaSans-800.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
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
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
