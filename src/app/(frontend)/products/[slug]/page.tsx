import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProductDetailPage from '../../components/product-detail/ProductDetailPage'
import { getAllProductSlugs, getProductBySlug } from '@/lib/products'

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Global Castle',
    }
  }

  return {
    title: `${product.itemNumber} | ${product.name} | Global Castle`,
    description: `${product.name} by Global Castle. Explore specifications, customization options, and inquiry details for ${product.itemNumber}.`,
  }
}

export default async function ProductSlugPage({
  params,
}: PageProps<'/products/[slug]'>) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}
