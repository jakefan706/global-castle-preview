import type { FeaturedCategoryCard } from '../category-config'

export type SolutionSlug =
  | 'private-label'
  | 'custom-branding'
  | 'packaging'
  | 'oem-odm-development'
  | 'logistics-and-delivery'

export type SolutionPageData = {
  slug: SolutionSlug
  title: string
  eyebrow: string
  shortTitle: string
  summary: string
  heroImage: string
  intro: string
  priorities: string[]
  proofPoints: Array<{
    label: string
    detail: string
  }>
  relatedCategorySlugs: FeaturedCategoryCard['slug'][]
}

export const SOLUTION_PAGES: SolutionPageData[] = [
  {
    slug: 'private-label',
    title: 'Integrated Private Label Collections',
    eyebrow: 'Private Label',
    shortTitle: 'Private Label',
    summary:
      'Launch market-proven ranges across our entire portfolio of stainless steel, ceramic, and tableware. We provide the templates for success.',
    heroImage: '/images/products/tumblers.jpg',
    intro:
      'For distributors and brand teams, private label work needs dependable product formats, clear MOQ planning, and a supplier who can coordinate decoration and packing without slowing the program down.',
    priorities: [
      'Match existing drinkware formats to target markets and price points.',
      'Align MOQ, finish direction, logo method, and packaging before sampling.',
      'Support repeat programs with stable specifications and practical export coordination.',
    ],
    proofPoints: [
      {
        label: 'Format Planning',
        detail: 'Stainless steel bottles, tumblers, mugs, and accessory sets can be grouped around a consistent brand range.',
      },
      {
        label: 'Brand Presentation',
        detail: 'Decoration, finish, packaging, and carton details are reviewed together so the final offer feels coherent.',
      },
      {
        label: 'Program Continuity',
        detail: 'Repeatable specifications help distributors manage replenishment, gifting seasons, and retailer follow-up orders.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'stainless-steel-tumblers', 'ceramic-mugs'],
  },
  {
    slug: 'custom-branding',
    title: 'Brand Identity & Surface Decoration',
    eyebrow: 'Brand Identity',
    shortTitle: 'Brand Identity',
    summary:
      'Comprehensive branding solutions across our entire portfolio. From private label setup to advanced surface techniques like laser engraving, 3D printing, and specialized coatings.',
    heroImage: '/images/banner-sample-2560x900.jpg',
    intro:
      'Branding is more than placing a logo. It combines the decoration method, product material, surface finish, color direction, and usage context into one practical production brief.',
    priorities: [
      'Select logo methods based on material, budget, and intended product use.',
      'Coordinate powder coating, matte, gloss, metallic, and gradient finish directions.',
      'Prepare decoration details that are clear enough for sampling and production review.',
    ],
    proofPoints: [
      {
        label: 'Logo Methods',
        detail: 'Laser engraving, silkscreen, UV print, and heat transfer options support different brand and durability needs.',
      },
      {
        label: 'Color & Finish',
        detail: 'Surface finish decisions can be aligned with packaging and product range planning.',
      },
      {
        label: 'Production Briefs',
        detail: 'Clear artwork and decoration specifications reduce avoidable back-and-forth during sample approval.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'stainless-steel-tumblers', 'glass-bottles-mugs'],
  },
  {
    slug: 'packaging',
    title: 'Retail-Ready & Bespoke Kitting',
    eyebrow: 'Retail Packaging',
    shortTitle: 'Packaging',
    summary:
      'Go beyond the box. We design and assemble retail-ready color boxes, gift sets, and custom kitting solutions that allow for immediate shelf placement.',
    heroImage: '/images/products/gift-sets.jpg',
    intro:
      'Packaging often decides whether a drinkware item is ready for retail shelves, gifting programs, or distributor catalog offers. We help connect product selection with practical packing direction.',
    priorities: [
      'Choose packaging formats based on sales channel, budget, and presentation needs.',
      'Coordinate product, accessory, insert, and carton requirements early.',
      'Keep branded packaging realistic for MOQ, handling, and export packing.',
    ],
    proofPoints: [
      {
        label: 'Packing Formats',
        detail: 'Bulk pack, white box, color box, gift box, and custom retail packaging can be planned around the program.',
      },
      {
        label: 'Gift Presentation',
        detail: 'Accessory and set configurations help support corporate gifting and promotional campaigns.',
      },
      {
        label: 'Export Handling',
        detail: 'Outer carton and packing details are considered alongside the visible packaging design.',
      },
    ],
    relatedCategorySlugs: ['accessories', 'stainless-steel-tumblers', 'ceramic-mugs'],
  },
  {
    slug: 'oem-odm-development',
    title: 'Technical OEM/ODM Development',
    eyebrow: 'Technical Development',
    shortTitle: 'OEM/ODM',
    summary:
      'Transform unique ideas into technical prototypes. With 20 years of expertise, we guide you through material selection, molding, and structural engineering for proprietary designs.',
    heroImage: '/images/products/steel-bottles.jpg',
    intro:
      'When a program needs more than standard decoration, the development path must stay realistic. We help connect target use, structure, material, sample direction, and production feasibility.',
    priorities: [
      'Translate product ideas into practical specifications and sample requirements.',
      'Review structure, material, cap, capacity, finish, and packaging as one program.',
      'Support development discussions before production commitments are made.',
    ],
    proofPoints: [
      {
        label: 'Concept Review',
        detail: 'Early feasibility checks help define what should be customized and what can use proven formats.',
      },
      {
        label: 'Sample Direction',
        detail: 'Sampling can cover structure, surface finish, logo decoration, and packaging presentation.',
      },
      {
        label: 'Production Readiness',
        detail: 'Clear specifications help align buyer expectations with factory-side execution.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'plastic-bottles', 'glass-bottles-mugs'],
  },
  {
    slug: 'logistics-and-delivery',
    title: 'Quality & Supply Chain Support',
    eyebrow: 'Quality & Supply Chain',
    shortTitle: 'Supply Chain',
    summary:
      'Rigorous multi-stage inspections and export documentation. We offer flexible Incoterms (FOB/EXW/DDP) and logistics coordination to ensure a smooth transition to your destination.',
    heroImage: '/images/banner4.webp',
    intro:
      'Reliable delivery depends on clear timing, production checkpoints, packing readiness, and export coordination. The goal is to keep buyers informed before, during, and after production.',
    priorities: [
      'Clarify sample timing, production lead time, packing details, and shipment windows.',
      'Coordinate inspection requirements and export documentation needs.',
      'Support distributors and brand teams managing launch dates or seasonal programs.',
    ],
    proofPoints: [
      {
        label: 'Timeline Planning',
        detail: 'Sampling, production, packing, and shipment milestones can be reviewed before order confirmation.',
      },
      {
        label: 'Inspection Support',
        detail: 'Quality and packing checks help reduce surprises before goods leave the factory.',
      },
      {
        label: 'Export Coordination',
        detail: 'Shipment and document coordination supports global distributors, wholesalers, and brand teams.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'stainless-steel-tumblers', 'accessories'],
  },
]

export const SOLUTIONS_HUB = {
  heroImage: '/images/solutions/result.webp',
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
  workflow: [
    {
      step: '01',
      title: 'Brief',
      text: 'Share product type, market, target quantity, branding needs, and packaging direction.',
    },
    {
      step: '02',
      title: 'Plan',
      text: 'Align suitable drinkware formats, decoration options, MOQ, samples, and delivery expectations.',
    },
    {
      step: '03',
      title: 'Sample',
      text: 'Review product finish, logo application, packaging direction, and practical production details.',
    },
    {
      step: '04',
      title: 'Produce',
      text: 'Move into production with confirmed specifications, checkpoints, packing, and export coordination.',
    },
  ],
  capabilityProof: [
    'Customization planning across logo, color, finish, and packaging.',
    'Food-contact compliance and structured quality review for B2B programs.',
    'Export support for distributors, wholesalers, gift companies, and brand teams.',
    'Product-category coverage from stainless steel bottles to accessories and gift sets.',
  ],
} as const

export const SUPPORT_MODEL_FLOW = [
  {
    slug: 'oem-odm-development',
    step: '01',
    role: 'Core Manufacturing',
  },
  {
    slug: 'custom-branding',
    step: '02',
    role: 'Visual Identity',
  },
  {
    slug: 'packaging',
    step: '03',
    role: 'Value-Added Services',
  },
  {
    slug: 'logistics-and-delivery',
    step: '04',
    role: 'Commercial Assurance',
  },
] as const

export function getSolutionBySlug(slug: string) {
  return SOLUTION_PAGES.find((solution) => solution.slug === slug)
}
