import config from '@payload-config'
import { getPayload, type Where } from 'payload'

import { extractRichTextLines } from './richtext'

type LooseObject = Record<string, unknown>

type ProductRecord = LooseObject & {
  _status?: string
  id?: number | string
  slug?: string
  name?: string
  itemNumber?: string
  material?: string
  customizeMOQ?: string
  classic?: boolean
  featured?: boolean
  newArrival?: boolean
  isPublished?: boolean
  category?: unknown
  applications?: unknown
  mainImage?: unknown
  gallery?: unknown
}

type NormalizedMedia = {
  id?: number | string
  alt: string
  url: string
}

type NormalizedProduct = {
  id: number | string | null
  slug: string
  name: string
  itemNumber: string
  material: string
  customizeMOQ: string
  categoryName: string
  categorySlug: string
  capacityLabel: string
  applications: string[]
  mainImage: NormalizedMedia
  gallery: NormalizedMedia[]
  featureBullets: string[]
  specs: Array<{ label: string; value: string }>
  logoMethods: string[]
  finishOptions: string[]
  packagingOptions: string[]
  relatedCategories: Array<{ name: string; slug: string; image: string; productSlug?: string }>
  inquiryMessage: string
  cardSceneImage: NormalizedMedia
  cardBadges: Array<{
    label: string
    tone: 'orange' | 'blue'
  }>
}

const FALLBACK_MAIN_IMAGE: NormalizedMedia = {
  alt: 'Double Wall Stainless Steel Tumbler',
  url: '/images/products/tumblers.jpg',
}

const FALLBACK_GALLERY: NormalizedMedia[] = [
  FALLBACK_MAIN_IMAGE,
  { alt: 'Stainless steel tumbler lid detail', url: '/images/products/steel-bottles.jpg' },
  { alt: 'Gift-ready tumbler packaging', url: '/images/products/gift-sets.jpg' },
  { alt: 'Drinkware production capability', url: '/images/banner-sample-2560x900.jpg' },
  { alt: 'Category sample image', url: '/images/products/ceramic-mugs.jpg' },
  { alt: 'Category sample image', url: '/images/products/glassware.jpg' },
  { alt: 'Category sample image', url: '/images/products/plastic-cups.jpg' },
  { alt: 'Category sample image', url: '/images/products/tumblers.jpg' },
]

const RELATED_CATEGORY_FALLBACKS = [
  {
    name: 'Stainless Steel Bottles',
    slug: 'stainless-steel-bottles',
    image: '/images/products/steel-bottles.jpg',
  },
  {
    name: 'Stainless Steel Tumblers',
    slug: 'stainless-steel-tumblers',
    image: '/images/products/tumblers.jpg',
  },
  {
    name: 'Ceramic Mugs',
    slug: 'ceramic-mugs',
    image: '/images/products/ceramic-mugs.jpg',
  },
  {
    name: 'Plastic Bottles',
    slug: 'plastic-bottles',
    image: '/images/products/plastic-cups.jpg',
  },
]

const SAMPLE_CATEGORY_CARDS = [
  {
    name: 'Stainless Steel Bottles',
    slug: 'stainless-steel-bottles',
    image: '/images/products/steel-bottles.jpg',
  },
  {
    name: 'Stainless Steel Tumblers',
    slug: 'stainless-steel-tumblers',
    image: '/images/products/tumblers.jpg',
  },
  {
    name: 'Plastic Bottles',
    slug: 'plastic-bottles',
    image: '/images/products/plastic-cups.jpg',
  },
  {
    name: 'Plastic Cup & Tumbler',
    slug: 'plastic-cup-tumbler',
    image: '/images/products/plastic-cups.jpg',
  },
  {
    name: 'Aluminum Bottles',
    slug: 'aluminum-bottles',
    image: '/images/products/steel-bottles.jpg',
  },
  {
    name: 'Ceramic Mugs',
    slug: 'ceramic-mugs',
    image: '/images/products/ceramic-mugs.jpg',
  },
  {
    name: 'Glass Bottles & Mugs',
    slug: 'glass-bottles-mugs',
    image: '/images/products/glassware.jpg',
  },
  {
    name: 'Food Containers',
    slug: 'food-containers',
    image: '/images/products/gift-sets.jpg',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: '/images/products/gift-sets.jpg',
  },
  {
    name: 'Eco-Friendly',
    slug: 'eco-friendly',
    image: '/images/products/ceramic-mugs.jpg',
  },
  {
    name: 'TECH',
    slug: 'tech',
    image: '/images/products/tumblers.jpg',
  },
] as const

const SHARED_SQUARE_GALLERY = [
  '/images/products/steel-bottles.jpg',
  '/images/products/tumblers.jpg',
  '/images/products/plastic-cups.jpg',
  '/images/products/ceramic-mugs.jpg',
  '/images/products/glassware.jpg',
  '/images/products/gift-sets.jpg',
] as const

function getSquareMedia(url: string, alt: string): NormalizedMedia {
  return { url, alt }
}

function buildSquareGallery(primaryUrl: string, productName: string) {
  const orderedUrls = [primaryUrl, ...SHARED_SQUARE_GALLERY.filter((url) => url !== primaryUrl)]

  return orderedUrls.slice(0, 6).map((url, index) =>
    getSquareMedia(url, index === 0 ? productName : `${productName} gallery view ${index + 1}`),
  )
}

function getRelatedCategories(slugs: string[]) {
  return slugs
    .map((slug) => SAMPLE_CATEGORY_CARDS.find((category) => category.slug === slug))
    .filter(Boolean) as NormalizedProduct['relatedCategories']
}

function createSampleProduct({
  itemNumber,
  name,
  material,
  customizeMOQ,
  categoryName,
  categorySlug,
  capacityLabel,
  applications,
  image,
  featureBullets,
  specs,
  logoMethods,
  finishOptions,
  packagingOptions,
  relatedCategorySlugs,
  inquiryMessage,
}: {
  itemNumber: string
  name: string
  material: string
  customizeMOQ: string
  categoryName: string
  categorySlug: string
  capacityLabel: string
  applications: string[]
  image: string
  featureBullets: string[]
  specs: Array<{ label: string; value: string }>
  logoMethods: string[]
  finishOptions: string[]
  packagingOptions: string[]
  relatedCategorySlugs: string[]
  inquiryMessage: string
}): NormalizedProduct {
  const gallery = buildSquareGallery(image, name)

  return {
    id: null,
    slug: slugifyItemNumber(itemNumber),
    name,
    itemNumber,
    material,
    customizeMOQ,
    categoryName,
    categorySlug,
    capacityLabel,
    applications,
    mainImage: getSquareMedia(image, name),
    gallery,
    featureBullets,
    specs,
    logoMethods,
    finishOptions,
    packagingOptions,
    relatedCategories: getRelatedCategories(relatedCategorySlugs),
    inquiryMessage,
    cardSceneImage: gallery[1] || getSquareMedia(image, `${name} scene view`),
    cardBadges: [],
  }
}

const GC_ST_420_FALLBACK: NormalizedProduct = {
  id: null,
  slug: 'gc-st-420',
  name: 'Double Wall Stainless Steel Tumbler',
  itemNumber: 'GC-ST-420',
  material: '18/8 Stainless Steel',
  customizeMOQ: '500pcs',
  categoryName: 'Stainless Steel Tumblers',
  categorySlug: 'stainless-steel-tumblers',
  capacityLabel: '420ml / 14oz',
  applications: ['Coffee Chains', 'Corporate Gifts', 'Retail', 'Promotional Campaigns'],
  mainImage: FALLBACK_MAIN_IMAGE,
  gallery: FALLBACK_GALLERY,
  featureBullets: [
    'Double-wall vacuum insulation keeps drinks hot for 12 hours or cold for 24 hours.',
    'Premium 18/8 stainless steel body built for repeat commercial use and private-label programs.',
    'BPA-free spill-resistant lid design with a clean, giftable silhouette.',
    'Sweat-proof exterior helps preserve table surfaces and carry comfort.',
    'Wide-mouth opening supports easy filling, cleaning, and ice cube compatibility.',
  ],
  specs: [
    { label: 'Item Number', value: 'GC-ST-420' },
    { label: 'Capacity', value: '420ml / 14oz' },
    { label: 'Material', value: '18/8 stainless steel' },
    { label: 'Lid', value: 'BPA-free plastic lid' },
    { label: 'Decoration', value: 'Laser engraving / printing / custom finish' },
    { label: 'Packaging', value: 'Bulk pack / white box / custom color box' },
    { label: 'Application', value: 'Coffee chains, corporate gifts, retail, promotional campaigns' },
  ],
  logoMethods: ['Laser engraving', 'Silkscreen printing', 'UV printing', 'Heat transfer'],
  finishOptions: ['Powder coating', 'Metallic', 'Matte', 'Gloss', 'Gradient'],
  packagingOptions: ['White box', 'Color box', 'Gift box', 'Custom retail packaging'],
  relatedCategories: RELATED_CATEGORY_FALLBACKS,
  inquiryMessage:
    'I am interested in GC-ST-420. Please share MOQ, customization options, packaging choices, and sample lead time.',
  cardSceneImage: FALLBACK_GALLERY[1] || FALLBACK_MAIN_IMAGE,
  cardBadges: [
    {
      label: 'CLASSIC',
      tone: 'blue',
    },
  ],
}

const SAMPLE_PRODUCTS: NormalizedProduct[] = [
  GC_ST_420_FALLBACK,
  createSampleProduct({
    itemNumber: 'GC-SB-721',
    name: 'Atlas Vacuum Stainless Bottle',
    material: '18/8 Stainless Steel',
    customizeMOQ: '600pcs',
    categoryName: 'Stainless Steel Bottles',
    categorySlug: 'stainless-steel-bottles',
    capacityLabel: '720ml / 24oz',
    applications: ['Corporate Gifts', 'Retail Programs', 'Fitness Brands'],
    image: '/images/products/steel-bottles.jpg',
    featureBullets: [
      'Vacuum-insulated bottle body designed for repeat B2B drinkware programs.',
      'Leak-resistant screw lid supports travel, sports, and gift-channel use.',
      'Tall silhouette works well for powder coating, engraving, and retail boxing.',
      'Stable base and wide-mouth opening improve daily use and cleaning convenience.',
      'Suitable for branded bottle ranges that need premium stainless presentation.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-SB-721' },
      { label: 'Category', value: 'Stainless Steel Bottles' },
      { label: 'Capacity', value: '720ml / 24oz' },
      { label: 'Material', value: '18/8 Stainless Steel' },
      { label: 'Lid', value: 'Leak-resistant screw lid' },
      { label: 'Decoration', value: 'Laser engraving / silkscreen / powder coat' },
      { label: 'Packaging', value: 'Bulk pack / white box / color box' },
      { label: 'Application', value: 'Corporate gifts, retail programs, fitness brands' },
    ],
    logoMethods: ['Laser engraving', 'Silkscreen printing', 'UV print', 'Embossed logo patch'],
    finishOptions: ['Powder coating', 'Matte', 'Metallic', 'Soft-touch'],
    packagingOptions: ['White box', 'Color box', 'Bottle wrap sleeve', 'Retail-ready carton'],
    relatedCategorySlugs: [
      'stainless-steel-tumblers',
      'accessories',
      'eco-friendly',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-SB-721. Please share MOQ, sample lead time, branding methods, and packaging options.',
  }),
  {
    ...createSampleProduct({
    itemNumber: 'GC-PB-338',
    name: 'Tritan Sports Water Bottle',
    material: 'BPA-Free Plastic',
    customizeMOQ: '1000pcs',
    categoryName: 'Plastic Bottles',
    categorySlug: 'plastic-bottles',
    capacityLabel: '680ml / 23oz',
    applications: ['School Programs', 'Outdoor Promotions', 'Event Giveaways'],
    image: '/images/products/plastic-cups.jpg',
    featureBullets: [
      'Lightweight Tritan-style construction for high-volume promotional programs.',
      'Flip-top carrying lid supports outdoor, school, and commuter use.',
      'Clear body helps color inserts and printed branding stand out.',
      'Economic MOQ range makes it practical for event and campaign sourcing.',
      'Designed for repeat-order bottle programs where freight efficiency matters.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-PB-338' },
      { label: 'Category', value: 'Plastic Bottles' },
      { label: 'Capacity', value: '680ml / 23oz' },
      { label: 'Material', value: 'BPA-free plastic' },
      { label: 'Lid', value: 'Flip-top sports lid with carry loop' },
      { label: 'Decoration', value: 'Silkscreen / wrap print / label insert' },
      { label: 'Packaging', value: 'Bulk pack / hang tag / color box' },
      { label: 'Application', value: 'School programs, outdoor promotions, event giveaways' },
    ],
    logoMethods: ['Silkscreen printing', 'Wrap print', 'In-mold label look', 'Sticker labeling'],
    finishOptions: ['Clear', 'Frosted', 'Color tint', 'Soft matte'],
    packagingOptions: ['Bulk pack', 'Hang tag', 'Color label wrap', 'Color box'],
    relatedCategorySlugs: [
      'plastic-cup-tumbler',
      'accessories',
      'eco-friendly',
      'food-containers',
    ],
    inquiryMessage:
      'I am interested in GC-PB-338. Please share MOQ, color options, printing methods, and packaging support.',
    }),
    cardBadges: [
      {
        label: 'New',
        tone: 'orange',
      },
    ],
  },
  createSampleProduct({
    itemNumber: 'GC-PC-244',
    name: 'Reusable Party Cup Tumbler',
    material: 'BPA-Free Plastic',
    customizeMOQ: '1200pcs',
    categoryName: 'Plastic Cup & Tumbler',
    categorySlug: 'plastic-cup-tumbler',
    capacityLabel: '470ml / 16oz',
    applications: ['Festival Merch', 'Brand Campaigns', 'Casual Retail'],
    image: '/images/products/plastic-cups.jpg',
    featureBullets: [
      'Reusable cold cup format developed for campaign, festival, and youth-brand use.',
      'Stackable body helps optimize packing and warehouse handling.',
      'Straw-compatible lid option supports color-matched brand programs.',
      'Large printable surface works well for seasonal graphics and giveaway branding.',
      'Budget-friendly structure fits large-volume promotional sourcing needs.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-PC-244' },
      { label: 'Category', value: 'Plastic Cup & Tumbler' },
      { label: 'Capacity', value: '470ml / 16oz' },
      { label: 'Material', value: 'BPA-free plastic' },
      { label: 'Lid', value: 'Optional straw lid / flat lid' },
      { label: 'Decoration', value: 'Silkscreen / wrap print / UV print' },
      { label: 'Packaging', value: 'Bulk pack / PDQ carton / color sleeve' },
      { label: 'Application', value: 'Festival merch, brand campaigns, casual retail' },
    ],
    logoMethods: ['Silkscreen printing', 'UV print', 'Wrap print', 'Label decoration'],
    finishOptions: ['Gloss clear', 'Frosted', 'Solid color', 'Glitter accent'],
    packagingOptions: ['Bulk pack', 'Color sleeve', 'PDQ display carton', 'Event multipack'],
    relatedCategorySlugs: [
      'plastic-bottles',
      'accessories',
      'eco-friendly',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-PC-244. Please share MOQ, cup colors, lid options, and campaign packaging details.',
  }),
  createSampleProduct({
    itemNumber: 'GC-AL-517',
    name: 'Lightweight Aluminum Travel Bottle',
    material: 'Aluminum',
    customizeMOQ: '800pcs',
    categoryName: 'Aluminum Bottles',
    categorySlug: 'aluminum-bottles',
    capacityLabel: '500ml / 17oz',
    applications: ['Travel Retail', 'Promotional Campaigns', 'Outdoor Stores'],
    image: '/images/products/steel-bottles.jpg',
    featureBullets: [
      'Single-wall aluminum body keeps the bottle lightweight for travel and event use.',
      'Slim profile fits branding programs that prioritize portability over insulation.',
      'Colored exterior finishes support fashion, travel, and campaign-led collections.',
      'Carabiner-ready lid option improves outdoor merchandising flexibility.',
      'Useful for price-sensitive branded programs that still need a metal bottle look.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-AL-517' },
      { label: 'Category', value: 'Aluminum Bottles' },
      { label: 'Capacity', value: '500ml / 17oz' },
      { label: 'Material', value: 'Aluminum' },
      { label: 'Lid', value: 'Screw lid / clip lid optional' },
      { label: 'Decoration', value: 'Silkscreen / heat transfer / anodized effect' },
      { label: 'Packaging', value: 'Bulk pack / white box / tourist retail box' },
      { label: 'Application', value: 'Travel retail, promotional campaigns, outdoor stores' },
    ],
    logoMethods: ['Silkscreen printing', 'Heat transfer', 'Laser marking', 'Label application'],
    finishOptions: ['Matte', 'Metallic', 'Brushed look', 'Anodized color effect'],
    packagingOptions: ['Bulk pack', 'White box', 'Retail window box', 'Hanging card'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'plastic-bottles',
      'eco-friendly',
      'accessories',
    ],
    inquiryMessage:
      'I am interested in GC-AL-517. Please share MOQ, finish colors, lid styles, and retail packaging options.',
  }),
  createSampleProduct({
    itemNumber: 'GC-CM-286',
    name: 'Stoneware Latte Ceramic Mug',
    material: 'Ceramic',
    customizeMOQ: '720pcs',
    categoryName: 'Ceramic Mugs',
    categorySlug: 'ceramic-mugs',
    capacityLabel: '380ml / 13oz',
    applications: ['Cafe Supply', 'Corporate Gifts', 'Lifestyle Retail'],
    image: '/images/products/ceramic-mugs.jpg',
    featureBullets: [
      'Stoneware mug profile built for cafe lines, office gifting, and lifestyle retail.',
      'Large front-facing panel supports logo placement and illustrated decal graphics.',
      'Comfortable handle and balanced mug proportions support daily-use programs.',
      'Reactive glaze direction adds premium shelf appeal for boutique ranges.',
      'Works well in bundled gift sets alongside coasters, spoons, or tea accessories.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-CM-286' },
      { label: 'Category', value: 'Ceramic Mugs' },
      { label: 'Capacity', value: '380ml / 13oz' },
      { label: 'Material', value: 'Ceramic' },
      { label: 'Handle', value: 'Large comfort-grip handle' },
      { label: 'Decoration', value: 'Decal print / silkscreen / glaze effect' },
      { label: 'Packaging', value: 'White box / color box / gift set insert' },
      { label: 'Application', value: 'Cafe supply, corporate gifts, lifestyle retail' },
    ],
    logoMethods: ['Decal print', 'Silkscreen printing', 'Gold rim accent', 'Embossed stamp'],
    finishOptions: ['Gloss glaze', 'Matte glaze', 'Reactive glaze', 'Speckled surface'],
    packagingOptions: ['White box', 'Color box', 'Gift box', 'Mug set packaging'],
    relatedCategorySlugs: [
      'glass-bottles-mugs',
      'accessories',
      'eco-friendly',
      'food-containers',
    ],
    inquiryMessage:
      'I am interested in GC-CM-286. Please share MOQ, glaze options, printing methods, and gift packaging support.',
  }),
  createSampleProduct({
    itemNumber: 'GC-GL-412',
    name: 'Borosilicate Tea Infuser Bottle',
    material: 'Glass',
    customizeMOQ: '600pcs',
    categoryName: 'Glass Bottles & Mugs',
    categorySlug: 'glass-bottles-mugs',
    capacityLabel: '450ml / 15oz',
    applications: ['Tea Brands', 'Office Gifts', 'Premium Retail'],
    image: '/images/products/glassware.jpg',
    featureBullets: [
      'Borosilicate bottle structure supports tea, infused water, and premium desk use.',
      'Visible glass body helps communicate ingredient quality and product cleanliness.',
      'Integrated infuser configuration works well for tea and wellness brand ranges.',
      'Silicone sleeve or bamboo detail can shift the product toward gift-ready positioning.',
      'Premium material story fits upscale retail and branded hospitality programs.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-GL-412' },
      { label: 'Category', value: 'Glass Bottles & Mugs' },
      { label: 'Capacity', value: '450ml / 15oz' },
      { label: 'Material', value: 'Borosilicate glass' },
      { label: 'Lid', value: 'Stainless lid with infuser basket' },
      { label: 'Decoration', value: 'Laser logo on lid / decal / sleeve branding' },
      { label: 'Packaging', value: 'White box / rigid gift box / display-ready sleeve' },
      { label: 'Application', value: 'Tea brands, office gifts, premium retail' },
    ],
    logoMethods: ['Laser logo', 'Decal print', 'Silicone sleeve deboss', 'Paper band'],
    finishOptions: ['Clear glass', 'Frosted print zone', 'Bamboo accent', 'Silicone sleeve'],
    packagingOptions: ['White box', 'Rigid gift box', 'Color sleeve', 'Premium insert pack'],
    relatedCategorySlugs: [
      'ceramic-mugs',
      'stainless-steel-bottles',
      'accessories',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-GL-412. Please share MOQ, infuser options, logo methods, and premium packaging details.',
  }),
  createSampleProduct({
    itemNumber: 'GC-FC-630',
    name: 'Vacuum Food Jar Container',
    material: '18/8 Stainless Steel',
    customizeMOQ: '500pcs',
    categoryName: 'Food Containers',
    categorySlug: 'food-containers',
    capacityLabel: '630ml / 21oz',
    applications: ['Lunch Programs', 'Outdoor Retail', 'Corporate Wellness Gifts'],
    image: '/images/products/gift-sets.jpg',
    featureBullets: [
      'Insulated food jar design helps expand drinkware programs into lunch and meal storage.',
      'Wide-mouth container opening supports soups, grains, fruit, and spoon access.',
      'Compact cylindrical body keeps packing and gifting presentation straightforward.',
      'Category works well for wellness campaigns, family products, and commuter retail.',
      'Matching spoon or fork accessory can convert the item into a gift-ready set.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-FC-630' },
      { label: 'Category', value: 'Food Containers' },
      { label: 'Capacity', value: '630ml / 21oz' },
      { label: 'Material', value: '18/8 stainless steel' },
      { label: 'Lid', value: 'Insulated screw lid with carry tab' },
      { label: 'Decoration', value: 'Laser engraving / silkscreen / wrap band' },
      { label: 'Packaging', value: 'Bulk pack / white box / spoon set box' },
      { label: 'Application', value: 'Lunch programs, outdoor retail, corporate wellness gifts' },
    ],
    logoMethods: ['Laser engraving', 'Silkscreen printing', 'Wrap band', 'Pad print on lid'],
    finishOptions: ['Powder coating', 'Matte', 'Soft-touch', 'Brushed steel'],
    packagingOptions: ['White box', 'Color box', 'Spoon set box', 'Gift-ready carton'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'accessories',
      'eco-friendly',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-FC-630. Please share MOQ, insulation details, accessory options, and packaging suggestions.',
  }),
  createSampleProduct({
    itemNumber: 'GC-AC-118',
    name: 'Bottle Gift Set Accessory Kit',
    material: 'Mixed Materials',
    customizeMOQ: '400sets',
    categoryName: 'Accessories',
    categorySlug: 'accessories',
    capacityLabel: '',
    applications: ['Gift Sets', 'Seasonal Campaigns', 'Private Label Bundles'],
    image: '/images/products/gift-sets.jpg',
    featureBullets: [
      'Accessory kit designed to complete gift-ready bottle and tumbler programs.',
      'Set can include carry sleeve, straw, brush, tag, and branded insert components.',
      'Useful for turning a standard drinkware SKU into a premium seasonal bundle.',
      'Flexible combination supports distributor gift projects and retail multipacks.',
      'Packaging-first configuration helps buyers align add-ons before sampling begins.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-AC-118' },
      { label: 'Category', value: 'Accessories' },
      { label: 'Material', value: 'Mixed materials' },
      { label: 'Set Content', value: 'Sleeve / straw / brush / insert card / gift wrap options' },
      { label: 'Decoration', value: 'Woven label / print card / branded wrap / sticker seal' },
      { label: 'Packaging', value: 'Gift set box / mailer-ready carton / retail kit' },
      { label: 'Application', value: 'Gift sets, seasonal campaigns, private label bundles' },
    ],
    logoMethods: ['Woven label', 'Printed insert', 'Sticker seal', 'Hang tag branding'],
    finishOptions: ['Kraft look', 'Color-matched set', 'Premium black set', 'Seasonal graphics'],
    packagingOptions: ['Gift set box', 'Mailer carton', 'Retail-ready kit', 'Window pack'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'stainless-steel-tumblers',
      'ceramic-mugs',
      'food-containers',
    ],
    inquiryMessage:
      'I am interested in GC-AC-118. Please share MOQ, set combinations, packaging formats, and branding support.',
  }),
  createSampleProduct({
    itemNumber: 'GC-EF-355',
    name: 'Recycled Material Daily Tumbler',
    material: 'Recycled Stainless Steel & PP',
    customizeMOQ: '700pcs',
    categoryName: 'Eco-Friendly',
    categorySlug: 'eco-friendly',
    capacityLabel: '355ml / 12oz',
    applications: ['Sustainability Campaigns', 'Office Gifts', 'Brand Merch'],
    image: '/images/products/ceramic-mugs.jpg',
    featureBullets: [
      'Compact tumbler format positioned for sustainability-led gifting and office use.',
      'Material story supports brand campaigns that need a clearer eco-friendly message.',
      'Neutral silhouette works well with understated color palettes and recycled packaging.',
      'Smaller capacity helps create a practical desktop tumbler for repeat daily use.',
      'Ideal for ESG campaigns, internal gifting, and retail sub-lines with greener positioning.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-EF-355' },
      { label: 'Category', value: 'Eco-Friendly' },
      { label: 'Capacity', value: '355ml / 12oz' },
      { label: 'Material', value: 'Recycled stainless steel & PP' },
      { label: 'Lid', value: 'Press-fit sip lid' },
      { label: 'Decoration', value: 'Laser logo / low-ink print / recycled paper band' },
      { label: 'Packaging', value: 'Kraft box / FSC sleeve / eco gift set' },
      { label: 'Application', value: 'Sustainability campaigns, office gifts, brand merch' },
    ],
    logoMethods: ['Laser logo', 'Low-ink silkscreen', 'Paper band branding', 'Deboss sleeve'],
    finishOptions: ['Natural matte', 'Stone tone', 'Soft green palette', 'Speckled finish'],
    packagingOptions: ['Kraft box', 'FSC sleeve', 'Eco gift set', 'Minimal mailer'],
    relatedCategorySlugs: [
      'stainless-steel-tumblers',
      'accessories',
      'food-containers',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-EF-355. Please share MOQ, sustainable material notes, packaging choices, and branding options.',
  }),
  createSampleProduct({
    itemNumber: 'GC-TE-908',
    name: 'Smart Temperature Display Bottle',
    material: 'Smart Lid + Stainless Steel',
    customizeMOQ: '500pcs',
    categoryName: 'TECH',
    categorySlug: 'tech',
    capacityLabel: '480ml / 16oz',
    applications: ['Premium Gifts', 'Tech Retail', 'Corporate Incentives'],
    image: '/images/products/tumblers.jpg',
    featureBullets: [
      'Integrated lid display brings a tech-led upgrade to a standard insulated bottle format.',
      'Premium presentation fits incentive gifting, electronics bundles, and modern office kits.',
      'Bottle body still supports mainstream decoration and packaging workflows.',
      'Useful for buyers who want a giftable SKU with stronger novelty value.',
      'Combines practical drinkware function with a more differentiated retail story.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-TE-908' },
      { label: 'Category', value: 'TECH' },
      { label: 'Capacity', value: '480ml / 16oz' },
      { label: 'Material', value: 'Smart lid + stainless steel body' },
      { label: 'Function', value: 'Touch temperature display on lid' },
      { label: 'Decoration', value: 'Laser logo / print body / gift insert branding' },
      { label: 'Packaging', value: 'Premium box / tech gift box / corporate kit' },
      { label: 'Application', value: 'Premium gifts, tech retail, corporate incentives' },
    ],
    logoMethods: ['Laser engraving', 'UV print', 'Gift insert branding', 'Lid print accent'],
    finishOptions: ['Matte black', 'Metallic silver', 'Soft-touch', 'Gradient tech finish'],
    packagingOptions: ['Premium box', 'Tech gift box', 'Corporate kit', 'Rigid retail pack'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'stainless-steel-tumblers',
      'accessories',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-TE-908. Please share MOQ, lid function details, branding options, and premium packaging support.',
  }),
  createSampleProduct({
    itemNumber: 'GC-ST-532',
    name: 'Commuter Grip Stainless Tumbler',
    material: '18/8 Stainless Steel',
    customizeMOQ: '500pcs',
    categoryName: 'Stainless Steel Tumblers',
    categorySlug: 'stainless-steel-tumblers',
    capacityLabel: '530ml / 18oz',
    applications: ['Coffee Programs', 'Employee Kits', 'Retail Shelves'],
    image: '/images/products/tumblers.jpg',
    featureBullets: [
      'Slim insulated tumbler profile developed for coffee and commuter-focused retail programs.',
      'Grip-friendly lower body improves daily handling for office, transit, and takeaway use.',
      'Straight wall surface supports clean logo placement for modern private-label lines.',
      'Push-sip lid helps keep the product practical for repeat corporate gift ordering.',
      'Balanced capacity works well for seasonal promotions and evergreen tumbler ranges.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-ST-532' },
      { label: 'Category', value: 'Stainless Steel Tumblers' },
      { label: 'Capacity', value: '530ml / 18oz' },
      { label: 'Material', value: '18/8 Stainless Steel' },
      { label: 'Lid', value: 'Push-sip sliding lid' },
      { label: 'Decoration', value: 'Laser engraving / silkscreen / powder coat' },
      { label: 'Packaging', value: 'Bulk pack / white box / branded gift box' },
      { label: 'Application', value: 'Coffee programs, employee kits, retail shelves' },
    ],
    logoMethods: ['Laser engraving', 'Silkscreen printing', 'UV print', 'Wrap logo band'],
    finishOptions: ['Powder coating', 'Matte', 'Soft-touch', 'Two-tone colorway'],
    packagingOptions: ['White box', 'Color box', 'Gift box', 'Retail shelf carton'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'accessories',
      'eco-friendly',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-ST-532. Please share MOQ, finish options, lid style details, and packaging support.',
  }),
  createSampleProduct({
    itemNumber: 'GC-SB-846',
    name: 'Summit Carry Loop Bottle',
    material: '18/8 Stainless Steel',
    customizeMOQ: '800pcs',
    categoryName: 'Stainless Steel Bottles',
    categorySlug: 'stainless-steel-bottles',
    capacityLabel: '820ml / 28oz',
    applications: ['Sports Brands', 'Outdoor Retail', 'Loyalty Programs'],
    image: '/images/products/steel-bottles.jpg',
    featureBullets: [
      'Larger-capacity insulated bottle built for outdoor and sports-oriented drinkware programs.',
      'Integrated carry loop supports active-use positioning and display merchandising.',
      'Clean shoulder line works well for engraving, powder coating, and tactical color stories.',
      'Suitable for customers who want a heavier-duty bottle option within the same collection.',
      'Retail-ready proportions help the bottle sit well in both gift and shelf presentation.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-SB-846' },
      { label: 'Category', value: 'Stainless Steel Bottles' },
      { label: 'Capacity', value: '820ml / 28oz' },
      { label: 'Material', value: '18/8 Stainless Steel' },
      { label: 'Lid', value: 'Screw cap with carry loop' },
      { label: 'Decoration', value: 'Laser engraving / powder coat / silkscreen' },
      { label: 'Packaging', value: 'Bulk pack / white box / retail color box' },
      { label: 'Application', value: 'Sports brands, outdoor retail, loyalty programs' },
    ],
    logoMethods: ['Laser engraving', 'Silkscreen printing', 'Embossed silicone patch', 'UV print'],
    finishOptions: ['Powder coating', 'Metallic', 'Hammer tone', 'Soft matte'],
    packagingOptions: ['White box', 'Color box', 'Retail-ready carton', 'Window box'],
    relatedCategorySlugs: [
      'stainless-steel-tumblers',
      'accessories',
      'tech',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-SB-846. Please share MOQ, carry-lid options, branding methods, and sample timing.',
  }),
  createSampleProduct({
    itemNumber: 'GC-PB-514',
    name: 'Daily Flip Tritan Bottle',
    material: 'BPA-Free Plastic',
    customizeMOQ: '1200pcs',
    categoryName: 'Plastic Bottles',
    categorySlug: 'plastic-bottles',
    capacityLabel: '520ml / 18oz',
    applications: ['School Retail', 'Summer Campaigns', 'Club Merchandise'],
    image: '/images/products/plastic-cups.jpg',
    featureBullets: [
      'Mid-size plastic bottle format designed for school, commuting, and seasonal promotion lines.',
      'Compact shape makes it easier to bundle into gift bags and event packs.',
      'Flip lid and carry strap help the product fit casual and youth-oriented programs.',
      'Clear and tinted body options give buyers room to build color-led assortments.',
      'Economic structure supports repeat ordering for campaign-driven sourcing plans.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-PB-514' },
      { label: 'Category', value: 'Plastic Bottles' },
      { label: 'Capacity', value: '520ml / 18oz' },
      { label: 'Material', value: 'BPA-free plastic' },
      { label: 'Lid', value: 'Flip lid with carry strap' },
      { label: 'Decoration', value: 'Silkscreen / wrap print / insert card' },
      { label: 'Packaging', value: 'Bulk pack / hang tag / event carton' },
      { label: 'Application', value: 'School retail, summer campaigns, club merchandise' },
    ],
    logoMethods: ['Silkscreen printing', 'Wrap print', 'Sticker label', 'Tag branding'],
    finishOptions: ['Clear', 'Smoke tint', 'Pastel tint', 'Frosted'],
    packagingOptions: ['Bulk pack', 'Hang tag', 'Color label wrap', 'Event pack carton'],
    relatedCategorySlugs: [
      'plastic-cup-tumbler',
      'accessories',
      'eco-friendly',
      'food-containers',
    ],
    inquiryMessage:
      'I am interested in GC-PB-514. Please share MOQ, body colors, print methods, and event packaging options.',
  }),
  createSampleProduct({
    itemNumber: 'GC-PC-662',
    name: 'Stackable Cold Cup Set Tumbler',
    material: 'BPA-Free Plastic',
    customizeMOQ: '1500pcs',
    categoryName: 'Plastic Cup & Tumbler',
    categorySlug: 'plastic-cup-tumbler',
    capacityLabel: '620ml / 21oz',
    applications: ['Theme Events', 'QSR Promotions', 'Gift-with-Purchase'],
    image: '/images/products/plastic-cups.jpg',
    featureBullets: [
      'High-capacity cold cup developed for event promotions and multi-color campaign launches.',
      'Stackable geometry keeps transport and warehouse handling efficient at larger volumes.',
      'Tall print area is suitable for mascot, slogan, and wrap-around promotional graphics.',
      'Optional straw and dome lid combinations increase flexibility for themed projects.',
      'Useful for buyers who need a more visual promotional cup than a standard bottle.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-PC-662' },
      { label: 'Category', value: 'Plastic Cup & Tumbler' },
      { label: 'Capacity', value: '620ml / 21oz' },
      { label: 'Material', value: 'BPA-free plastic' },
      { label: 'Lid', value: 'Flat lid / dome lid / straw lid optional' },
      { label: 'Decoration', value: 'Silkscreen / UV print / wrap print' },
      { label: 'Packaging', value: 'Bulk pack / display carton / promotional multipack' },
      { label: 'Application', value: 'Theme events, QSR promotions, gift-with-purchase' },
    ],
    logoMethods: ['Silkscreen printing', 'UV print', 'Wrap print', 'Sticker seal'],
    finishOptions: ['Gloss clear', 'Frosted', 'Solid neon', 'Glitter accent'],
    packagingOptions: ['Bulk pack', 'Display carton', 'Promotional multipack', 'Color sleeve'],
    relatedCategorySlugs: [
      'plastic-bottles',
      'accessories',
      'tech',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-PC-662. Please share MOQ, lid combinations, cup colors, and promo-pack options.',
  }),
  createSampleProduct({
    itemNumber: 'GC-AL-684',
    name: 'Metro Slim Aluminum Bottle',
    material: 'Aluminum',
    customizeMOQ: '1000pcs',
    categoryName: 'Aluminum Bottles',
    categorySlug: 'aluminum-bottles',
    capacityLabel: '650ml / 22oz',
    applications: ['Tourist Retail', 'Marathon Events', 'Merchandising'],
    image: '/images/products/steel-bottles.jpg',
    featureBullets: [
      'Slim aluminum bottle profile built for large-volume souvenir and event-driven programs.',
      'Lightweight body improves freight efficiency for simple branded bottle rollouts.',
      'Carabiner-compatible lid option supports outdoor and seasonal destination retail.',
      'Metal appearance gives the item stronger perceived value than standard plastic formats.',
      'Useful when buyers need a budget-aware metal bottle for promotional sales channels.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-AL-684' },
      { label: 'Category', value: 'Aluminum Bottles' },
      { label: 'Capacity', value: '650ml / 22oz' },
      { label: 'Material', value: 'Aluminum' },
      { label: 'Lid', value: 'Screw lid with optional clip top' },
      { label: 'Decoration', value: 'Silkscreen / heat transfer / matte spray finish' },
      { label: 'Packaging', value: 'Bulk pack / hang card / souvenir box' },
      { label: 'Application', value: 'Tourist retail, marathon events, merchandising' },
    ],
    logoMethods: ['Silkscreen printing', 'Heat transfer', 'Label application', 'Laser marking'],
    finishOptions: ['Matte', 'Satin metallic', 'Brushed look', 'Color anodized effect'],
    packagingOptions: ['Bulk pack', 'Hang card', 'Souvenir box', 'Retail tray carton'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'plastic-bottles',
      'accessories',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-AL-684. Please share MOQ, body finishes, lid choices, and souvenir packaging details.',
  }),
  createSampleProduct({
    itemNumber: 'GC-CM-472',
    name: 'Nordic Straight Wall Mug',
    material: 'Ceramic',
    customizeMOQ: '840pcs',
    categoryName: 'Ceramic Mugs',
    categorySlug: 'ceramic-mugs',
    capacityLabel: '420ml / 14oz',
    applications: ['Office Gifts', 'Cafe Chains', 'Seasonal Collections'],
    image: '/images/products/ceramic-mugs.jpg',
    featureBullets: [
      'Straight-wall ceramic mug gives buyers a cleaner, more contemporary cafe silhouette.',
      'Large branding panel helps graphic logos and seasonal illustrations read clearly.',
      'Balanced 14oz capacity works for office sets, promotions, and counter retail.',
      'Works well in paired mug-and-spoon or mug-and-coaster seasonal gift bundles.',
      'Glaze flexibility makes it practical for brands building coordinated ceramic ranges.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-CM-472' },
      { label: 'Category', value: 'Ceramic Mugs' },
      { label: 'Capacity', value: '420ml / 14oz' },
      { label: 'Material', value: 'Ceramic' },
      { label: 'Handle', value: 'Rounded comfort handle' },
      { label: 'Decoration', value: 'Decal print / silkscreen / matte glaze' },
      { label: 'Packaging', value: 'White box / color box / gift pair packaging' },
      { label: 'Application', value: 'Office gifts, cafe chains, seasonal collections' },
    ],
    logoMethods: ['Decal print', 'Silkscreen printing', 'Gold accent', 'Embossed stamp'],
    finishOptions: ['Gloss glaze', 'Matte glaze', 'Speckled finish', 'Contrast interior color'],
    packagingOptions: ['White box', 'Color box', 'Gift pair packaging', 'Seasonal sleeve'],
    relatedCategorySlugs: [
      'glass-bottles-mugs',
      'accessories',
      'eco-friendly',
      'food-containers',
    ],
    inquiryMessage:
      'I am interested in GC-CM-472. Please share MOQ, glaze combinations, branding methods, and seasonal packaging options.',
  }),
  createSampleProduct({
    itemNumber: 'GC-GL-568',
    name: 'Double Wall Glass Coffee Mug',
    material: 'Borosilicate Glass',
    customizeMOQ: '720pcs',
    categoryName: 'Glass Bottles & Mugs',
    categorySlug: 'glass-bottles-mugs',
    capacityLabel: '350ml / 12oz',
    applications: ['Cafe Gifts', 'Lifestyle Retail', 'Premium Promotions'],
    image: '/images/products/glassware.jpg',
    featureBullets: [
      'Double-wall glass mug format gives hot beverage programs a lighter, more refined look.',
      'Clear construction helps coffee, tea, and layered drinks photograph well for retail use.',
      'Premium material story fits boutique gifting and hospitality-led product launches.',
      'Compact body can be bundled with a spoon, coaster, or coffee drip accessory.',
      'Useful for buyers who want a premium alternative to standard ceramic formats.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-GL-568' },
      { label: 'Category', value: 'Glass Bottles & Mugs' },
      { label: 'Capacity', value: '350ml / 12oz' },
      { label: 'Material', value: 'Borosilicate Glass' },
      { label: 'Handle', value: 'Integrated double-wall loop handle' },
      { label: 'Decoration', value: 'Decal / laser logo on accessory / belly band' },
      { label: 'Packaging', value: 'White box / rigid gift box / premium sleeve' },
      { label: 'Application', value: 'Cafe gifts, lifestyle retail, premium promotions' },
    ],
    logoMethods: ['Decal print', 'Laser accessory logo', 'Paper band branding', 'Sticker seal'],
    finishOptions: ['Clear glass', 'Frosted accent', 'Bamboo accessory set', 'Gift sleeve finish'],
    packagingOptions: ['White box', 'Rigid gift box', 'Premium sleeve', 'Set box'],
    relatedCategorySlugs: [
      'ceramic-mugs',
      'accessories',
      'eco-friendly',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-GL-568. Please share MOQ, glass decoration options, and premium gift packaging details.',
  }),
  createSampleProduct({
    itemNumber: 'GC-FC-488',
    name: 'Clip Lid Lunch Container',
    material: 'Stainless Steel + PP',
    customizeMOQ: '600pcs',
    categoryName: 'Food Containers',
    categorySlug: 'food-containers',
    capacityLabel: '480ml / 16oz',
    applications: ['Meal Prep Ranges', 'School Lunch', 'Family Promotions'],
    image: '/images/products/gift-sets.jpg',
    featureBullets: [
      'Compact lunch container extends drinkware sourcing into practical food storage programs.',
      'Clip-lid configuration helps buyers target school, family, and meal-prep positioning.',
      'Flat surface areas support straightforward logo placement on lid and body banding.',
      'Stack-friendly shape can be integrated into multi-piece lunch set concepts.',
      'Good option for customers planning coordinated wellness or back-to-school launches.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-FC-488' },
      { label: 'Category', value: 'Food Containers' },
      { label: 'Capacity', value: '480ml / 16oz' },
      { label: 'Material', value: 'Stainless steel + PP components' },
      { label: 'Closure', value: 'Clip lid with silicone seal' },
      { label: 'Decoration', value: 'Laser logo / pad print / wrap band' },
      { label: 'Packaging', value: 'Bulk pack / lunch set box / family retail pack' },
      { label: 'Application', value: 'Meal prep ranges, school lunch, family promotions' },
    ],
    logoMethods: ['Laser engraving', 'Pad print', 'Wrap band branding', 'Sticker label'],
    finishOptions: ['Natural steel', 'Matte coated lid', 'Soft pastel components', 'Kraft sleeve'],
    packagingOptions: ['Bulk pack', 'Lunch set box', 'Family retail pack', 'Gift carton'],
    relatedCategorySlugs: [
      'accessories',
      'eco-friendly',
      'stainless-steel-bottles',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-FC-488. Please share MOQ, seal details, set options, and lunch-pack packaging support.',
  }),
  createSampleProduct({
    itemNumber: 'GC-AC-274',
    name: 'Travel Straw and Cleaner Set',
    material: 'Stainless Steel + Silicone',
    customizeMOQ: '800sets',
    categoryName: 'Accessories',
    categorySlug: 'accessories',
    capacityLabel: '',
    applications: ['Bottle Add-ons', 'Retail Attach Sales', 'Gift Bundles'],
    image: '/images/products/gift-sets.jpg',
    featureBullets: [
      'Accessory set created to upsell bottles and tumblers with a more complete usage kit.',
      'Includes reusable straw, brush, and compact pouch for gifting or retail bundling.',
      'Good fit for catalog buyers who want a light add-on rather than a full gift box set.',
      'Helps distributors build higher-value packs around existing bestselling drinkware SKUs.',
      'Compact packaging keeps the item practical for cross-selling and mailer programs.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-AC-274' },
      { label: 'Category', value: 'Accessories' },
      { label: 'Material', value: 'Stainless steel + silicone components' },
      { label: 'Set Content', value: 'Reusable straw / cleaning brush / travel pouch' },
      { label: 'Decoration', value: 'Pouch print / insert card / sticker branding' },
      { label: 'Packaging', value: 'Polybag / color card / compact gift sleeve' },
      { label: 'Application', value: 'Bottle add-ons, retail attach sales, gift bundles' },
    ],
    logoMethods: ['Pouch print', 'Insert card branding', 'Sticker seal', 'Hang tag'],
    finishOptions: ['Solid silicone colors', 'Neutral pouch', 'Gift sleeve', 'Seasonal card set'],
    packagingOptions: ['Polybag', 'Color card', 'Compact gift sleeve', 'Retail hook pack'],
    relatedCategorySlugs: [
      'stainless-steel-bottles',
      'stainless-steel-tumblers',
      'food-containers',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-AC-274. Please share MOQ, set contents, pouch branding, and compact retail packaging options.',
  }),
  createSampleProduct({
    itemNumber: 'GC-EF-614',
    name: 'Bamboo Accent Travel Mug',
    material: 'Recycled Stainless Steel + Bamboo',
    customizeMOQ: '600pcs',
    categoryName: 'Eco-Friendly',
    categorySlug: 'eco-friendly',
    capacityLabel: '410ml / 14oz',
    applications: ['ESG Gifting', 'Conference Kits', 'Green Retail'],
    image: '/images/products/ceramic-mugs.jpg',
    featureBullets: [
      'Travel mug combines recycled metal body with bamboo detail for a stronger eco-oriented presentation.',
      'Natural material accents help the product stand apart in sustainability-themed gift projects.',
      'Moderate size works well for event kits, office gifting, and retail checkout programs.',
      'Pairs naturally with kraft packaging and low-ink branding approaches.',
      'Useful for buyers building a greener sub-range without changing the full product system.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-EF-614' },
      { label: 'Category', value: 'Eco-Friendly' },
      { label: 'Capacity', value: '410ml / 14oz' },
      { label: 'Material', value: 'Recycled stainless steel + bamboo accent' },
      { label: 'Lid', value: 'Press-fit sip lid with bamboo detail' },
      { label: 'Decoration', value: 'Laser logo / low-ink print / kraft wrap' },
      { label: 'Packaging', value: 'Kraft box / FSC sleeve / eco mailer' },
      { label: 'Application', value: 'ESG gifting, conference kits, green retail' },
    ],
    logoMethods: ['Laser engraving', 'Low-ink silkscreen', 'Paper wrap branding', 'Deboss sleeve'],
    finishOptions: ['Natural matte', 'Stone green', 'Warm sand tone', 'Bamboo top accent'],
    packagingOptions: ['Kraft box', 'FSC sleeve', 'Eco mailer', 'Gift-ready kraft set'],
    relatedCategorySlugs: [
      'stainless-steel-tumblers',
      'accessories',
      'food-containers',
      'tech',
    ],
    inquiryMessage:
      'I am interested in GC-EF-614. Please share MOQ, eco material notes, bamboo options, and kraft packaging support.',
  }),
  createSampleProduct({
    itemNumber: 'GC-TE-642',
    name: 'Wireless Charging Desk Mug Set',
    material: 'Stainless Steel + Charging Base',
    customizeMOQ: '400sets',
    categoryName: 'TECH',
    categorySlug: 'tech',
    capacityLabel: '420ml / 14oz',
    applications: ['Executive Gifts', 'Tech Bundles', 'Corporate Rewards'],
    image: '/images/products/tumblers.jpg',
    featureBullets: [
      'Desk gift set combines a modern tumbler with a charging accessory for premium corporate programs.',
      'Bundled configuration gives distributors a higher-value tech drinkware concept to present.',
      'Useful for incentive, onboarding, and executive gifting where standard bottles feel too basic.',
      'Presentation-first format supports rigid boxes, inserts, and branded corporate sleeves.',
      'Product direction fits B2B buyers looking for a more differentiated catalog story.',
    ],
    specs: [
      { label: 'Item Number', value: 'GC-TE-642' },
      { label: 'Category', value: 'TECH' },
      { label: 'Capacity', value: '420ml / 14oz' },
      { label: 'Material', value: 'Stainless steel mug + charging base' },
      { label: 'Function', value: 'Wireless charging accessory paired with mug set' },
      { label: 'Decoration', value: 'Laser logo / base print / insert branding' },
      { label: 'Packaging', value: 'Rigid gift box / executive kit / premium insert pack' },
      { label: 'Application', value: 'Executive gifts, tech bundles, corporate rewards' },
    ],
    logoMethods: ['Laser engraving', 'UV print', 'Base print branding', 'Insert card branding'],
    finishOptions: ['Matte black', 'Metallic graphite', 'Soft-touch coating', 'Executive navy set'],
    packagingOptions: ['Rigid gift box', 'Executive kit', 'Premium insert pack', 'Corporate mailer'],
    relatedCategorySlugs: [
      'stainless-steel-tumblers',
      'stainless-steel-bottles',
      'accessories',
      'eco-friendly',
    ],
    inquiryMessage:
      'I am interested in GC-TE-642. Please share MOQ, charging-base options, branding details, and executive packaging formats.',
  }),
]

function slugifyItemNumber(value: string | null | undefined) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function isLooseObject(value: unknown): value is LooseObject {
  return typeof value === 'object' && value !== null
}

async function canReachDatabase() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    return false
  }

  return true
}

function normalizeMedia(media: unknown, fallbackAlt: string): NormalizedMedia {
  if (!isLooseObject(media)) {
    return { ...FALLBACK_MAIN_IMAGE, alt: fallbackAlt }
  }

  const sizes = isLooseObject(media.sizes) ? media.sizes : null
  const full = sizes && isLooseObject(sizes.full) ? sizes.full : null
  const card = sizes && isLooseObject(sizes.card) ? sizes.card : null
  const thumbnail = sizes && isLooseObject(sizes.thumbnail) ? sizes.thumbnail : null
  const url =
    (typeof media.url === 'string' ? media.url : null) ||
    (full && typeof full.url === 'string' ? full.url : null) ||
    (card && typeof card.url === 'string' ? card.url : null) ||
    (thumbnail && typeof thumbnail.url === 'string' ? thumbnail.url : null)

  return {
    id: typeof media.id === 'number' || typeof media.id === 'string' ? media.id : undefined,
    alt: typeof media.alt === 'string' ? media.alt : fallbackAlt,
    url: typeof url === 'string' ? url : FALLBACK_MAIN_IMAGE.url,
  }
}

function buildCardBadges(product: ProductRecord): NormalizedProduct['cardBadges'] {
  const badges: NormalizedProduct['cardBadges'] = []

  if (product.newArrival === true) {
    badges.push({
      label: 'New',
      tone: 'orange',
    })
  }

  if (product.classic === true || product.featured === true) {
    badges.push({
      label: 'CLASSIC',
      tone: 'blue',
    })
  }

  return badges
}

function normalizeSpecLabel(label: string) {
  const cleaned = label.trim().replace(/[:\-–]+$/, '')
  return cleaned || 'Specification'
}

const SPEC_LABEL_ORDER = ['Capacity', 'Size', 'Lid Type', 'Material', 'Lid', 'Closure']

function sortSpecs(specs: Array<{ label: string; value: string }>) {
  return [...specs].sort((a, b) => {
    const ai = SPEC_LABEL_ORDER.findIndex((l) => a.label.toLowerCase().startsWith(l.toLowerCase()))
    const bi = SPEC_LABEL_ORDER.findIndex((l) => b.label.toLowerCase().startsWith(l.toLowerCase()))
    const aOrder = ai === -1 ? 999 : ai
    const bOrder = bi === -1 ? 999 : bi
    if (aOrder !== bOrder) return aOrder - bOrder
    return 0
  })
}

function extractSpecsFromRichText(value: unknown) {
  const parsed = extractRichTextLines(value)
    .map((line) => {
      const separatorMatch = line.match(/^([^:|]+?)\s*[:|]\s*(.+)$/)

      if (separatorMatch) {
        return {
          label: normalizeSpecLabel(separatorMatch[1]),
          value: separatorMatch[2].trim(),
        }
      }

      const dashMatch = line.match(/^([^–-]+?)\s*[–-]\s*(.+)$/)

      if (dashMatch) {
        return {
          label: normalizeSpecLabel(dashMatch[1]),
          value: dashMatch[2].trim(),
        }
      }

      return {
        label: 'Specification',
        value: line,
      }
    })
    .filter((entry) => entry.value)

  return sortSpecs(parsed)
}

/** Pull the capacity string (e.g. "16oz / 480ml") out of the specifications rich text */
function extractCapacityFromSpecs(value: unknown): string {
  const specs = extractRichTextLines(value)
  for (const line of specs) {
    const m = line.match(/^Capacity\s*[:|]\s*(.+)$/i)
    if (m) return m[1].trim()
  }
  return ''
}

function mergeGalleryImages(mainImage: NormalizedMedia, gallery: NormalizedMedia[]) {
  const merged = [mainImage, ...gallery].filter((image) => image.url)
  const seen = new Set<string>()

  return merged.filter((image) => {
    if (seen.has(image.url)) {
      return false
    }

    seen.add(image.url)
    return true
  })
}

function pickFeatureBullets(product: ProductRecord, capacityLabel: string, applications: string[]) {
  const featuresFromCMS = extractRichTextLines(product.description)

  if (featuresFromCMS.length) {
    return featuresFromCMS
  }

  if (product.itemNumber === 'GC-ST-420' || slugifyItemNumber(product.itemNumber) === 'gc-st-420') {
    return GC_ST_420_FALLBACK.featureBullets
  }

  const features = [
    `${product.material ? `${toMaterialLabel(product.material)} construction` : 'Factory-grade drinkware construction'} supports dependable OEM and gifting programs.`,
    capacityLabel
      ? `${capacityLabel} format suitable for distributor, retail, and promotional sourcing.`
      : 'Capacity configuration can be tailored to target programs and market expectations.',
    'Decoration-ready exterior supports logo branding, surface finishing, and packaging customization.',
    applications.length
      ? `Fit for ${applications.slice(0, 3).join(', ').toLowerCase()} programs.`
      : 'Designed for B2B sourcing across retail, gift, and campaign channels.',
  ]

  return features
}

function toMaterialLabel(material: string | null | undefined) {
  if (!material) return 'Material not specified'

  const map: Record<string, string> = {
    'stainless-steel': '18/8 Stainless Steel',
    aluminum: 'Aluminum',
    plastic: 'BPA-Free Plastic',
    ceramic: 'Ceramic',
    glass: 'Glass',
    other: 'Custom Material',
  }

  return map[material] || material
}

function getCategoryName(category: unknown) {
  if (isLooseObject(category) && typeof category.name === 'string') {
    return category.name || 'Drinkware'
  }

  return 'Drinkware'
}

function getCategorySlug(category: unknown) {
  if (isLooseObject(category) && typeof category.slug === 'string') {
    return category.slug
  }

  return 'stainless-steel-tumblers'
}

function normalizeApplications(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      if (typeof item === 'string') return item
      if (isLooseObject(item) && typeof item.name === 'string') return item.name
      return null
    })
    .filter(Boolean) as string[]
}

function buildSpecs(product: ProductRecord, normalized: Omit<NormalizedProduct, 'specs'>) {
  const specsFromCMS = extractSpecsFromRichText(product.specifications)

  if (specsFromCMS.length) {
    return specsFromCMS
  }

  const specs = [
    { label: 'Item Number', value: normalized.itemNumber },
    { label: 'Category', value: normalized.categoryName },
    { label: 'Material', value: normalized.material },
  ]

  if (normalized.capacityLabel) {
    specs.push({ label: 'Capacity', value: normalized.capacityLabel })
  }

  if (normalized.applications.length) {
    specs.push({ label: 'Application', value: normalized.applications.join(', ') })
  }

  specs.push({ label: 'Decoration', value: 'Laser engraving / silkscreen / UV print / heat transfer' })
  specs.push({ label: 'Packaging', value: 'Bulk pack / white box / color box / gift-ready packaging' })

  if (product.itemNumber === 'GC-ST-420' || slugifyItemNumber(product.itemNumber) === 'gc-st-420') {
    return GC_ST_420_FALLBACK.specs
  }

  return sortSpecs(specs)
}

function normalizeProduct(product: ProductRecord): NormalizedProduct {
  const itemNumber = product.itemNumber || 'GC-ST-420'
  const slug = slugifyItemNumber(itemNumber) || product.slug || 'gc-st-420'
  const categoryName = getCategoryName(product.category)
  const categorySlug = getCategorySlug(product.category)
  const applications = normalizeApplications(product.applications)
  const capacityLabel = extractCapacityFromSpecs(product.specifications)
  const material = toMaterialLabel(product.material)
  const mainImage = normalizeMedia(product.mainImage, product.name || GC_ST_420_FALLBACK.name)
  const galleryFromCMS =
    Array.isArray(product.gallery) && product.gallery.length
      ? product.gallery
          .map((entry) =>
            normalizeMedia(
              isLooseObject(entry) ? entry.image : null,
              product.name || GC_ST_420_FALLBACK.name,
            ),
          )
          .slice(0, 8)
      : []
  const gallery = mergeGalleryImages(
    mainImage,
    galleryFromCMS.length ? galleryFromCMS : GC_ST_420_FALLBACK.gallery,
  ).slice(0, 8)

  const baseProduct = {
    id: product.id ?? null,
    slug,
    name: product.name || GC_ST_420_FALLBACK.name,
    itemNumber,
    material,
    customizeMOQ:
      typeof product.customizeMOQ === 'string' && product.customizeMOQ.trim()
        ? product.customizeMOQ.trim()
        : GC_ST_420_FALLBACK.customizeMOQ,
    categoryName,
    categorySlug,
    capacityLabel,
    applications,
    mainImage,
    gallery,
    featureBullets: pickFeatureBullets(product, capacityLabel, applications),
    logoMethods: GC_ST_420_FALLBACK.logoMethods,
    finishOptions: GC_ST_420_FALLBACK.finishOptions,
    packagingOptions: GC_ST_420_FALLBACK.packagingOptions,
    relatedCategories: RELATED_CATEGORY_FALLBACKS,
    inquiryMessage: `I am interested in ${itemNumber}. Please share MOQ, lead time, branding options, and packaging details.`,
    cardSceneImage: gallery[1] || mainImage,
    cardBadges: buildCardBadges(product),
  }

  return {
    ...baseProduct,
    specs: buildSpecs(product, baseProduct),
  }
}

/** Pick 4 random products from the same category, excluding self */
function pickRelatedProducts(
  allProducts: NormalizedProduct[],
  selfSlug: string,
  selfCategorySlug: string,
): NormalizedProduct['relatedCategories'] {
  const sameCategory = allProducts.filter(
    (p) => p.categorySlug === selfCategorySlug && p.slug !== selfSlug,
  )

  // shuffle deterministically-ish (by slug hash) so it doesn't change on every request
  const shuffled = [...sameCategory].sort((a, b) => {
    const ha = hashString(a.slug + selfSlug)
    const hb = hashString(b.slug + selfSlug)
    return ha - hb
  })

  return shuffled.slice(0, 4).map((p) => ({
    name: p.name,
    slug: p.categorySlug,
    image: p.mainImage.url,
    productSlug: p.slug,
  }))
}

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h >>> 0
}

function getInternalOrigin() {
  const explicitOrigin =
    process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || ''

  if (explicitOrigin.trim()) {
    return explicitOrigin.replace(/\/+$/, '')
  }

  const port = process.env.PORT?.trim()

  if (port) {
    return `http://127.0.0.1:${port}`
  }

  return null
}

async function fetchProductsFromAPI() {
  const origin = getInternalOrigin()

  if (!origin) {
    return null
  }

  try {
    const response = await fetch(`${origin}/api/products?limit=100&depth=2`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as {
      docs?: ProductRecord[]
    }

    if (!Array.isArray(payload.docs)) {
      return null
    }

    return payload.docs.filter(
      (doc) => isLooseObject(doc) && (doc.isPublished === true || doc._status === 'published'),
    ) as ProductRecord[]
  } catch {
    return null
  }
}

/** After normalizing all products, fill in relatedCategories with same-category products */
function fillRelatedProducts(products: NormalizedProduct[]): NormalizedProduct[] {
  return products.map((product) => ({
    ...product,
    relatedCategories:
      pickRelatedProducts(products, product.slug, product.categorySlug).length > 0
        ? pickRelatedProducts(products, product.slug, product.categorySlug)
        : product.relatedCategories,
  }))
}

let payloadPromise: ReturnType<typeof getPayload> | null = null

async function getPayloadClient() {
  const reachable = await canReachDatabase()

  if (!reachable) {
    return null
  }

  if (!payloadPromise) {
    payloadPromise = getPayload({ config, cron: true })
  }

  return payloadPromise
}

function publishedProductWhere() {
  const where: Where = {
    or: [
      {
        isPublished: {
          equals: true,
        },
      } as Where,
      {
        and: [
          {
            isPublished: {
              exists: false,
            },
          } as Where,
          {
            _status: {
              equals: 'published',
            },
          } as Where,
        ],
      } as Where,
    ],
  }

  return where
}

export async function getAllProductSlugs() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      const docsFromAPI = await fetchProductsFromAPI()

      if (!docsFromAPI?.length) {
        return SAMPLE_PRODUCTS.map((product) => product.slug)
      }

      const apiSlugs = docsFromAPI
        .map((doc) => slugifyItemNumber(typeof doc.itemNumber === 'string' ? doc.itemNumber : ''))
        .filter(Boolean)

      return Array.from(new Set([...apiSlugs, ...SAMPLE_PRODUCTS.map((product) => product.slug)]))
    }

    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 0,
      pagination: false,
      where: publishedProductWhere(),
      select: {
        itemNumber: true,
      },
    })

    const slugs = Array.isArray(result.docs)
      ? result.docs
          .map((doc) =>
            slugifyItemNumber(
              isLooseObject(doc) && typeof doc.itemNumber === 'string' ? doc.itemNumber : '',
            ),
          )
          .filter(Boolean)
      : []

    return Array.from(new Set([...slugs, ...SAMPLE_PRODUCTS.map((product) => product.slug)]))
  } catch {
    const docsFromAPI = await fetchProductsFromAPI()

    if (!docsFromAPI?.length) {
      return SAMPLE_PRODUCTS.map((product) => product.slug)
    }

    const apiSlugs = docsFromAPI
      .map((doc) => slugifyItemNumber(typeof doc.itemNumber === 'string' ? doc.itemNumber : ''))
      .filter(Boolean)

    return Array.from(new Set([...apiSlugs, ...SAMPLE_PRODUCTS.map((product) => product.slug)]))
  }
}

export async function getProductBySlug(slug: string) {
  const normalizedSlug = slugifyItemNumber(slug)

  if (!normalizedSlug) {
    return null
  }

  // getProductIndex already fills relatedCategories — reuse it
  const allProducts = await getProductIndex()
  const found = allProducts.find((p) => p.slug === normalizedSlug)
  return found || null
}

export async function getProductIndex() {
  try {
    const payload = await getPayloadClient()
    if (!payload) {
      const docsFromAPI = await fetchProductsFromAPI()

      if (!docsFromAPI?.length) {
        return SAMPLE_PRODUCTS
      }

      const normalizedDocs = docsFromAPI.map((doc) => normalizeProduct(doc))
      const existingSlugs = new Set(normalizedDocs.map((product) => product.slug))
      const missingSamples = SAMPLE_PRODUCTS.filter((product) => !existingSlugs.has(product.slug))

      return fillRelatedProducts([...normalizedDocs, ...missingSamples])
    }

    const result = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 1,
      pagination: false,
      where: publishedProductWhere(),
    })

    const docs = Array.isArray(result.docs)
      ? result.docs.filter(isLooseObject).map((doc) => normalizeProduct(doc as ProductRecord))
      : []

    if (!docs.length) {
      return SAMPLE_PRODUCTS
    }

    const existingSlugs = new Set(docs.map((product) => product.slug))
    const missingSamples = SAMPLE_PRODUCTS.filter((product) => !existingSlugs.has(product.slug))

    return fillRelatedProducts([...docs, ...missingSamples])
  } catch {
    const docsFromAPI = await fetchProductsFromAPI()

    if (!docsFromAPI?.length) {
      return SAMPLE_PRODUCTS
    }

    const normalizedDocs = docsFromAPI.map((doc) => normalizeProduct(doc))
    const existingSlugs = new Set(normalizedDocs.map((product) => product.slug))
    const missingSamples = SAMPLE_PRODUCTS.filter((product) => !existingSlugs.has(product.slug))

    return fillRelatedProducts([...normalizedDocs, ...missingSamples])
  }
}
