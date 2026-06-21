export type ResourceDownload = {
  title: string
  summary: string
  coverImage: string
  pdfUrl: string
  fileSize: string
  yearLabel: string
}

export type VerificationItem = {
  name: string
  logo: string
  detail: string
}

export type QuickSupportItem = {
  question: string
  answer: string
}

export const RESOURCES_HUB = {
  heroImage: '/images/solutions/result.webp',
  eyebrow: 'Resource Center',
  title: 'Download the sales tools buyers actually need.',
  summary:
    'A cleaner resource hub for catalog access, compliance references, and fast pre-inquiry support before your next OEM or private-label program moves forward.',
  proofPoints: [
    { value: '4', label: 'live catalog downloads' },
    { value: '6', label: 'core compliance references' },
    { value: '24h', label: 'typical reply window for new inquiries' },
  ],
} as const

export const downloads: ResourceDownload[] = [
  {
    yearLabel: '2025',
    title: 'Urban Eco Q1 Catalog',
    summary:
      'A broad seasonal catalog for current drinkware directions, gift-ready formats, and export-friendly assortment planning.',
    coverImage: '/images/resources/catalogs/urban-eco-2025-q1-catalog-01.jpg',
    pdfUrl: '/downloads/catalogs/urban-eco-2025-q1-catalog.pdf',
    fileSize: '11 MB PDF',
  },
  {
    yearLabel: '2024',
    title: 'Urban Eco Flexibility Catalog',
    summary:
      'A lighter catalog option for quick sharing when buyers want an overview without opening a heavy full-range file.',
    coverImage: '/images/resources/catalogs/urban-eco-2024-flexibility-catalog-01.jpg',
    pdfUrl: '/downloads/catalogs/urban-eco-2024-flexibility-catalog.pdf',
    fileSize: '3 MB PDF',
  },
  {
    yearLabel: '2024',
    title: 'Urban Eco Main Catalog',
    summary:
      'A deeper range presentation for teams comparing materials, assortment width, and collection planning across categories.',
    coverImage: '/images/resources/catalogs/urban-eco-2024-main-catalog-001.jpg',
    pdfUrl: '/downloads/catalogs/urban-eco-2024-main-catalog.pdf',
    fileSize: '44 MB PDF',
  },
  {
    yearLabel: '2023',
    title: 'Urban Eco Q4 Catalog',
    summary:
      'A prior-season catalog that is still useful for reviewing classic formats, gifting direction, and repeat-order references.',
    coverImage: '/images/resources/catalogs/urban-eco-2023-q4-catalog-01.jpg',
    pdfUrl: '/downloads/catalogs/urban-eco-2023-q4-catalog.pdf',
    fileSize: '12 MB PDF',
  },
] as const

export const verificationItems: VerificationItem[] = [
  {
    name: 'FDA',
    logo: '/images/certifications/fda.png',
    detail: 'Food-contact compliance reference for U.S.-facing programs.',
  },
  {
    name: 'LFGB',
    logo: '/images/certifications/lfgb.png',
    detail: 'A key review point for German and wider EU market requirements.',
  },
  {
    name: 'SGS',
    logo: '/images/certifications/sgs.png',
    detail: 'Third-party testing support when buyers need added verification.',
  },
  {
    name: 'BSCI',
    logo: '/images/certifications/bsci.png',
    detail: 'Factory social compliance reference for vendor review workflows.',
  },
  {
    name: 'ISO 9001',
    logo: '/images/certifications/iso.png',
    detail: 'Signals structured process control for repeat export programs.',
  },
  {
    name: 'CE',
    logo: '/images/certifications/ce.png',
    detail: 'Supporting reference when project specs extend beyond core drinkware.',
  },
] as const

export const quickSupportItems: QuickSupportItem[] = [
  {
    question: 'Which catalog should I open first?',
    answer:
      'Start with the 2025 Q1 catalog for the broadest current overview, then use the 2024 main catalog when you need a deeper product sweep.',
  },
  {
    question: 'Can you share a lighter file for quick internal review?',
    answer:
      'Yes. The Flexibility Catalog is the best low-friction file for email forwarding, quick meetings, and early buyer alignment.',
  },
  {
    question: 'What should we prepare before requesting a quote?',
    answer:
      'Product type, estimated quantity, logo method, packaging direction, and delivery target are the five inputs that speed up review most.',
  },
  {
    question: 'Need something not in these files?',
    answer:
      'Send the target category or market goal and we can point you to the right collection, compliance note, or custom development path.',
  },
] as const
