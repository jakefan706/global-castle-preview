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
  programFocusTitle?: string
  supportTitle?: string
  relatedTitle?: string
  relatedDescription?: string
  moreSolutionsTitle?: string
  moreSolutionsDescription?: string
  inquiryButtonLabel?: string
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
    title: 'Advanced Surface Engineering & Brand Identity',
    eyebrow: 'Brand Identity',
    shortTitle: 'Brand Identity',
    summary:
      'Beyond just a logo. We offer a comprehensive suite of decoration techniques to ensure your brand stands out with precision and durability across stainless steel, ceramics, and glassware.',
    heroImage: '/images/banner-sample-2560x900.jpg',
    intro:
      'Strong branding performance depends on choosing the right process for each material. We align decoration method, color system, finish behavior, and end-use requirements so your identity remains sharp and consistent across every collection.',
    priorities: [
      'Technique Selection: Aligning the best decoration method such as laser, silk-screen, or UV with your material and budget.',
      'Color Fidelity: Professional Pantone and RAL color matching to ensure global brand consistency.',
      'Durability Standards: Every finish is tested for adhesion, abrasion resistance, and dishwasher safety.',
    ],
    proofPoints: [
      {
        label: 'Logo Methods',
        detail: 'Detailed guidance on laser engraving, silk-screen, 3D printing, and heat transfer helps determine the right fit for your design complexity.',
      },
      {
        label: 'Color & Finish',
        detail: 'Selection of powder coating, reactive glazes, and electroplating. We help you decide between matte, glossy, or soft-touch textures.',
      },
      {
        label: 'Visual Proofing',
        detail: 'Every program begins with a digital mockup and a physical swatch review to help ensure zero-error mass production.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'ceramic-mugs', 'glass-bottles-mugs'],
    programFocusTitle: 'Precision Branding Across Every Material.',
    supportTitle: 'Technical Consultancy: Defining the Aesthetic.',
    relatedTitle: 'Ensuring Brand Consistency Across Collections.',
    relatedDescription:
      'From stainless steel drinkware to ceramic tableware and glassware, we help translate one visual identity into a cohesive multi-material brand system.',
  },
  {
    slug: 'packaging',
    title: 'Retail-Ready Packaging & Integrated Kitting',
    eyebrow: 'Retail Packaging',
    shortTitle: 'Packaging',
    summary:
      'Elevate the unboxing experience. We design, source, and assemble bespoke packaging and curated gift sets that allow your brand to move directly from our factory to the retail shelf.',
    heroImage: '/images/products/gift-sets.jpg',
    intro:
      'Packaging should reduce complexity, not add another supplier layer. We coordinate structure, presentation, protection, and kitting in one workflow so your drinkware and tableware programs stay commercially consistent from sample approval through shelf delivery.',
    priorities: [
      'Structural Integrity: Packaging designed to survive international transit, especially for fragile ceramics and glassware.',
      'Brand Storytelling: Custom inserts, color boxes, and kitting that reflect your brand’s premium positioning.',
      'Sustainable Options: Eco-friendly materials and FSC-certified paper paths for environmentally conscious programs.',
    ],
    proofPoints: [
      {
        label: 'Format Selection',
        detail: 'Choosing between white boxes, color display boxes, or premium rigid gift sets based on your retail channel and presentation goals.',
      },
      {
        label: 'Protective Engineering',
        detail: 'Selection of EVA, foam, or corrugated cardboard inserts specifically engineered and reviewed against drop-test expectations.',
      },
      {
        label: 'Kitting & Assembly',
        detail: 'Strategic bundling of different materials such as a tumbler and a ceramic mug into one cohesive brand presentation.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'ceramic-mugs', 'accessories'],
    programFocusTitle: 'Complexity Simplified: From Single Units to Gift Sets.',
    supportTitle: 'Strategic Packaging Design & Engineering.',
    relatedTitle: 'Create Your Own Integrated Collection.',
    relatedDescription:
      'Combine stainless steel drinkware, ceramic pieces, and packaged accessories into coordinated retail sets that raise perceived value and strengthen shelf presence.',
  },
  {
    slug: 'oem-odm-development',
    title: 'Precision OEM/ODM Engineering: From Concept to Mass Production.',
    eyebrow: 'Technical Development',
    shortTitle: 'OEM/ODM',
    summary:
      'Transform your proprietary ideas into market-ready realities. We leverage 20 years of structural expertise and material science to ensure your custom designs are durable, compliant, and cost-efficient.',
    heroImage: '/images/products/steel-bottles.jpg',
    intro:
      'When a concept moves beyond standard decoration, the development path needs disciplined engineering. We connect structural intent, material choice, compliance targets, and production feasibility before costly tooling decisions are made.',
    priorities: [
      'Material Versatility: Expertise in high-grade stainless steel, premium ceramics, and borosilicate glass.',
      'Structural Integrity: Rigorous feasibility studies and stress testing before mold creation.',
      'Market Alignment: Designs optimized for European and American retail standards including FDA, LFGB, and BSCI expectations.',
    ],
    proofPoints: [
      {
        label: 'Concept Review',
        detail: 'We analyze your 2D and 3D files for manufacturing feasibility, structural clarity, and material performance before sampling begins.',
      },
      {
        label: 'Technical Guidance',
        detail: 'Professional advice on wall thickness, insulation vacuum technology, and glaze durability helps avoid expensive revisions later.',
      },
      {
        label: 'Cost Optimization',
        detail: 'We suggest the most efficient manufacturing paths to meet your target price points without compromising performance or finish quality.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'plastic-bottles', 'glass-bottles-mugs'],
    programFocusTitle: 'Strategic Development Tailored for Global Brands.',
    supportTitle: 'Minimizing Risk Before the First Sample.',
    relatedTitle: 'Start from a proven foundation.',
    relatedDescription:
      'Use one of our market-tested product platforms as the base for faster, lower-risk secondary development through color, lid, branding, and packaging refinement.',
    moreSolutionsTitle: 'Ready to Prototype Your Vision?',
    moreSolutionsDescription:
      'Consult with our technical team today. Let us turn your sourcing brief into a polished, retail-ready collection.',
    inquiryButtonLabel: 'Consult Our Technical Team',
  },
  {
    slug: 'logistics-and-delivery',
    title: 'Reliable Supply Chain & Quality Assurance',
    eyebrow: 'Quality & Supply Chain',
    shortTitle: 'Supply Chain',
    summary:
      'Eliminating risk in international sourcing. With 20 years of expertise, we manage every critical milestone from raw material traceability to final AQL inspections and complex export coordination.',
    heroImage: '/images/banner4.webp',
    intro:
      'Large-scale supply programs need timing discipline, inspection clarity, and documentation accuracy. We build predictable fulfillment by aligning production control, QA checkpoints, and shipment readiness around your commercial deadlines.',
    priorities: [
      'Lead-time Accuracy: Precise critical-path management to ensure your products hit the market on schedule.',
      'Standardized QA: Multi-stage inspections including IQC, IPQC, and FQC based on international AQL standards.',
      'Documentation Excellence: Expert handling of export manifests, certificates of origin, and compliance paperwork for zero-friction customs.',
    ],
    proofPoints: [
      {
        label: 'Timeline Management',
        detail: 'Mapping out every production milestone to synchronize with your marketing launch windows or inventory cycles.',
      },
      {
        label: 'Inspection Protocol',
        detail: 'Defining acceptable quality levels and specific test parameters such as adhesion, vacuum, and food-contact requirements for each batch.',
      },
      {
        label: 'Logistics Coordination',
        detail: 'Flexible support for FOB, EXW, or DDP. We coordinate with your forwarders or our trusted channels to help ensure smooth delivery.',
      },
    ],
    relatedCategorySlugs: ['stainless-steel-bottles', 'stainless-steel-tumblers', 'accessories'],
    programFocusTitle: 'Predictable Fulfillment for Large-Scale Programs.',
    supportTitle: 'Strategic Oversight Before & During Production.',
    relatedTitle: 'Proven Capacity Across Core Categories.',
    relatedDescription:
      'From high-volume stainless steel drinkware to more complex gift-set assembly, we support consistent output, inspection discipline, and shipment readiness across the categories buyers depend on most.',
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
      title: 'Discovery',
      text: 'Share your vision, target market, and product categories from drinkware to integrated tableware. We align on quantity, branding goals, and custom packaging requirements.',
    },
    {
      step: '02',
      title: 'Strategy & Alignment',
      text: 'Leveraging our 20-year expertise to align the best materials, technical specs, and MOQ. We define the roadmap for samples, pricing, and delivery expectations across FOB, EXW, or DDP.',
    },
    {
      step: '03',
      title: 'Prototyping',
      text: 'Physical review of product finish, logo precision, and retail-ready packaging. We fine-tune every detail to ensure the final product reflects your brand integrity.',
    },
    {
      step: '04',
      title: 'Execution & Quality',
      text: 'Transition to mass production with rigorous QC checkpoints. We manage specification adherence, final inspection, and flexible export coordination through shipment handoff.',
    },
  ],
  capabilityProof: [
    'Strategic Customization: Tailored logo techniques, trend-driven color palettes, and retail-ready packaging designed to elevate your brand.',
    'Global Market Entry: Ensuring full compliance with FDA, LFGB, and international safety standards through rigorous, structured quality reviews.',
    'Supply Chain Reliability: 20 years of industry expertise providing seamless support for distributors, wholesalers, and global brand teams.',
    'Full-Spectrum Manufacturing: Integrated production spanning premium stainless steel, ceramics, glassware, and comprehensive tableware collections.',
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
