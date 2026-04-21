export const CONTACT_HERO = {
  eyebrow: 'Project Inquiry Desk',
  title: 'Start a custom drinkware project with a sourcing brief the factory can actually work from.',
  description:
    'Use this page to turn product requirements, branding direction, packaging needs, and timing expectations into a practical B2B inquiry program.',
  primaryCta: {
    label: 'Open Inquiry Form',
    href: '#project-inquiry',
  },
  secondaryCta: {
    label: 'Review Contact Methods',
    href: '#contact-methods',
  },
  promises: [
    {
      label: 'Response speed',
      detail: 'Initial review within 24 hours for standard business inquiries.',
    },
    {
      label: 'MOQ and sample guidance',
      detail: 'Early direction on quantity fit, sample path, and customization feasibility.',
    },
    {
      label: 'Export coordination',
      detail: 'Support for shipping documents, labels, and packing alignment before dispatch.',
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
