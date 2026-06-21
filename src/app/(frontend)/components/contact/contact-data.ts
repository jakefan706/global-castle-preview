export const CONTACT_HERO = {
  eyebrow: 'Project Inquiry Desk',
  title: 'Start Your Sourcing Program with UrbanEco.',
  description:
    'Use this desk to submit your project specifications, customization goals, and volume requirements. Our engineering team specializes in expanding your brand across premium drinkware, ceramics, and integrated tableware collections.',
  primaryCta: {
    label: 'Launch Project Inquiry',
    href: '#project-inquiry',
  },
  secondaryCta: {
    label: 'Download Briefing Guide',
    href: '/resources#downloads',
  },
  promises: [
    {
      label: 'Response speed',
      detail: 'Technical review and initial quote within 24 hours for standard business days.',
    },
    {
      label: 'MOQ and sample guidance',
      detail: 'Early direction on quantity fit, rapid sampling lead-times, and material availability.',
    },
    {
      label: 'Export coordination',
      detail: 'Full support for flexible Incoterms (FOB, EXW, DDP), compliant documentation, and brand consistency.',
    },
  ],
} as const

export const INQUIRY_SIDEBAR = {
  title: 'What helps us respond faster',
  description:
    'Professional buyers usually get a better first reply when the inquiry already includes the key working inputs below.',
  bulletGroups: [
    {
      title: 'Project basics',
      items: [
        'Target product type, size, and lid direction',
        'Estimated quantity or MOQ expectation',
        'Target market or buyer channel',
      ],
    },
    {
      title: 'Branding and packaging',
      items: [
        'Logo method, finish, or decoration reference',
        'Packaging format, inserts, or retail presentation needs',
        'Carton marks, barcode, or label requirements',
      ],
    },
    {
      title: 'Timing and coordination',
      items: [
        'Target sample timing or launch window',
        'Forwarder, warehouse, or destination notes',
        'Any compliance or document expectations already known',
      ],
    },
  ],
} as const

export const CONTACT_DETAILS = {
  eyebrow: 'Contact Intelligence',
  title: 'Work with the channel that fits the project stage.',
  description:
    'Email is best for structured inquiry details. WhatsApp and meetings become more useful once product direction and timelines are defined.',
  cards: [
    {
      label: 'Email',
      value: 'info@globalcastle.com',
      note: 'Best for RFQ details, files, artwork references, and packaging notes.',
    },
    {
      label: 'WhatsApp',
      value: '+86 571 8888 8888',
      note: 'Useful for active project follow-up, quick confirmations, and sample progress.',
    },
    {
      label: 'Location',
      value: 'Hangzhou, Zhejiang, China',
      note: 'Factory and export coordination base for overseas buyer programs.',
    },
  ],
} as const

export const RESPONSE_COMMITMENT = [
  {
    window: '24 hours',
    title: 'Initial response',
    detail: 'A first reply to confirm receipt, scope fit, and the next practical step.',
  },
  {
    window: '1-2 days',
    title: 'Product and decoration direction',
    detail:
      'Preliminary guidance on bottle type, finish options, customization path, and likely MOQ considerations.',
  },
  {
    window: '5-10 days',
    title: 'Sample discussion',
    detail:
      'Timing depends on artwork readiness, packaging complexity, and how defined the project scope is at inquiry stage.',
  },
] as const

export const LOGISTICS_COORDINATION = {
  eyebrow: 'Logistics and Export Coordination',
  title: 'The inquiry can also cover the shipment details that usually surface later.',
  description:
    'If needed, the team can help align forwarder handoff, carton information, export paperwork, and practical packing requirements before production and dispatch move forward.',
  items: [
    'China forwarder coordination and warehouse handoff notes',
    'Packing requirements for retail, gifting, or bulk programs',
    'Carton labels, barcode references, and shipping mark alignment',
    'Export documents and related order handover paperwork',
  ],
} as const
