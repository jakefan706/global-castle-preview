export type ResourceCategory = {
  title: string
  description: string
  bullets: string[]
  href: string
  ctaLabel: string
}

export type GuideCard = {
  category: string
  question: string
  summary: string
  href: string
  ctaLabel: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type CertificationHighlight = {
  name: string
  logo: string
  detail: string
}

export type BrochureDownload = {
  quarter: string
  title: string
  summary: string
  coverImage: string
  pdfUrl: string
  status: string
  fileLabel?: string
}

export const RESOURCES_HUB = {
  heroImage: '/images/banner1.webp',
  proofPoints: [
    {
      value: '20+',
      label: 'years in drinkware export',
    },
    {
      value: '60+',
      label: 'countries served',
    },
    {
      value: '12+',
      label: 'testing and certification standards',
    },
  ],
} as const

export const resourceCategories: ResourceCategory[] = [
  {
    title: 'Customization & Branding',
    description:
      'Help buyers align product format, logo method, finish direction, and packaging presentation before sampling starts.',
    bullets: [
      'Decoration methods matched to material and use case',
      'Finish direction for gifting, retail, and distributor programs',
      'Practical coordination between product and brand presentation',
    ],
    href: '/solutions/custom-branding',
    ctaLabel: 'Explore branding support',
  },
  {
    title: 'Packaging & MOQ Planning',
    description:
      'Clarify quantity expectations, box formats, accessory combinations, and retail-ready packaging paths before quote approval.',
    bullets: [
      'White box, color box, and gift set planning',
      'MOQ direction for standard and customized programs',
      'Packing details that stay realistic for export handling',
    ],
    href: '/solutions/packaging',
    ctaLabel: 'View packaging solutions',
  },
  {
    title: 'Quality, Sampling & Delivery',
    description:
      'Support sourcing teams with the checkpoints that matter before production launch, inspection, and shipment scheduling.',
    bullets: [
      'Sample review priorities before production commitment',
      'Food-contact compliance and structured quality review',
      'Lead time and shipment coordination for repeat orders',
    ],
    href: '/solutions/logistics-and-delivery',
    ctaLabel: 'See delivery coordination',
  },
]

export const guideCards: GuideCard[] = [
  {
    category: 'Customization & Branding',
    question: 'How should we choose the right logo method for stainless steel, ceramic, or glass drinkware?',
    summary:
      'Start with material, target market, durability expectations, and finish direction so branding stays practical in production.',
    href: '/solutions/custom-branding',
    ctaLabel: 'View branding guide',
  },
  {
    category: 'Customization & Branding',
    question: 'What should be confirmed before approving a custom sample?',
    summary:
      'Review product structure, finish, logo placement, lid details, and packaging direction together instead of treating them as separate approvals.',
    href: '/solutions/oem-odm-development',
    ctaLabel: 'See sample workflow',
  },
  {
    category: 'Packaging & MOQ Planning',
    question: 'How do MOQ and packaging decisions affect a private label program?',
    summary:
      'MOQ should be checked alongside decoration method, accessory count, and final packing format to avoid mismatch between budget and presentation.',
    href: '/solutions/private-label',
    ctaLabel: 'Review private label support',
  },
  {
    category: 'Packaging & MOQ Planning',
    question: 'Which packaging path fits distributor, retail, or gift orders best?',
    summary:
      'Bulk pack, white box, color box, and gift-ready formats serve different channel needs, and should be chosen before sample approval.',
    href: '/solutions/packaging',
    ctaLabel: 'Compare packaging paths',
  },
  {
    category: 'Quality, Sampling & Delivery',
    question: 'What quality checkpoints should buyers confirm before shipment?',
    summary:
      'Focus on material consistency, decoration accuracy, packing readiness, and export-facing inspection expectations before goods leave the factory.',
    href: '/solutions/logistics-and-delivery',
    ctaLabel: 'Check delivery support',
  },
  {
    category: 'Quality, Sampling & Delivery',
    question: 'How should we plan lead time for sampling, production, and delivery?',
    summary:
      'A realistic timeline starts with product format, customization scope, packaging complexity, and shipment window, not just factory production time.',
    href: '/products/gc-st-420',
    ctaLabel: 'Review product detail example',
  },
]

export const faqItems: FaqItem[] = [
  {
    question: 'What is the typical MOQ for customized drinkware orders?',
    answer:
      'MOQ depends on the product type, decoration method, and packaging path. Standard formats can start lower, while custom branding and retail packaging usually need MOQ review together before confirmation.',
  },
  {
    question: 'Can you support sample development before we place a bulk order?',
    answer:
      'Yes. Sampling can cover structure, finish, logo decoration, and packaging direction so your team can review both product function and presentation before production.',
  },
  {
    question: 'Which branding options are usually available for B2B programs?',
    answer:
      'Common options include laser engraving, silkscreen printing, UV print, and transfer methods, with finish choices such as powder coating, matte, gloss, metallic, and gradient directions.',
  },
  {
    question: 'Can packaging be customized for gifting or retail channels?',
    answer:
      'Yes. White box, color box, gift box, inserts, accessory combinations, and custom retail-ready presentation can be planned based on the target sales channel and order structure.',
  },
  {
    question: 'How do you support quality review and certification needs?',
    answer:
      'We help buyers align food-contact compliance, factory-side quality checkpoints, packing review, and relevant testing expectations before shipment coordination begins.',
  },
  {
    question: 'What information should we prepare before sending an inquiry?',
    answer:
      'The most useful starting points are target product type, estimated quantity, branding requirement, packaging direction, and expected delivery timing. That makes MOQ and sample discussion more efficient.',
  },
]

export const certificationHighlights: CertificationHighlight[] = [
  {
    name: 'FDA',
    logo: '/images/certifications/fda.png',
    detail: 'Supports food-contact compliance discussions for drinkware programs headed to regulated export markets.',
  },
  {
    name: 'LFGB',
    logo: '/images/certifications/lfgb.png',
    detail: 'Useful for buyers reviewing product suitability for European market requirements and testing expectations.',
  },
  {
    name: 'CE',
    logo: '/images/certifications/ce.png',
    detail: 'Included as part of broader documentation conversations when project requirements extend beyond core drinkware specs.',
  },
  {
    name: 'ISO 9001',
    logo: '/images/certifications/iso.png',
    detail: 'Signals structured process control for teams that need consistency across repeat OEM and private-label orders.',
  },
  {
    name: 'BSCI',
    logo: '/images/certifications/bsci.png',
    detail: 'Relevant for sourcing teams that review social compliance and factory audit expectations during vendor selection.',
  },
  {
    name: 'SGS',
    logo: '/images/certifications/sgs.png',
    detail: 'Supports third-party testing conversations when buyers need added confidence before shipment approval.',
  },
]

export const brochureDownloads: BrochureDownload[] = [
  {
    quarter: 'Q1 2026',
    title: 'Custom Drinkware Program Overview',
    summary:
      'Reserved slot for the latest quarterly brochure covering bottles, tumblers, mugs, and gifting-ready formats. Replace with the approved PDF and final cover when available.',
    coverImage: '/images/products/tumblers.jpg',
    pdfUrl: '#resource-inquiry',
    status: 'Placeholder slot',
    fileLabel: 'PDF upload pending',
  },
  {
    quarter: 'Q4 2025',
    title: 'Holiday Gifting & Packaging Range',
    summary:
      'Prepared for a quarter-specific brochure focused on gift sets, festive packaging, and distributor-ready presentation ideas.',
    coverImage: '/images/products/gift-sets.jpg',
    pdfUrl: '#resource-inquiry',
    status: 'Placeholder slot',
    fileLabel: 'PDF upload pending',
  },
  {
    quarter: 'Q3 2025',
    title: 'Stainless Steel Bottles & Tumblers',
    summary:
      'Prepared for a product-led brochure featuring high-volume stainless steel formats, decoration methods, and repeat-order programs.',
    coverImage: '/images/products/steel-bottles.jpg',
    pdfUrl: '#resource-inquiry',
    status: 'Placeholder slot',
    fileLabel: 'PDF upload pending',
  },
  {
    quarter: 'Q2 2025',
    title: 'Multi-Material Drinkware Collection',
    summary:
      'Prepared for a broader range brochure covering ceramic, glass, and plastic categories alongside practical OEM support notes.',
    coverImage: '/images/products/ceramic-mugs.jpg',
    pdfUrl: '#resource-inquiry',
    status: 'Placeholder slot',
    fileLabel: 'PDF upload pending',
  },
]
