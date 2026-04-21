import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import SolutionDetailPage from '../../components/solutions/SolutionDetailPage'
import { getSolutionBySlug, SOLUTION_PAGES } from '../../components/solutions/solutions-data'

export function generateStaticParams() {
  return SOLUTION_PAGES.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/solutions/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    return {
      title: 'Solution Not Found | Global Castle',
    }
  }

  return {
    title: `${solution.title} | Global Castle`,
    description: `${solution.summary} Learn how Global Castle supports custom drinkware programs for distributors and brands.`,
  }
}

export default async function SolutionSlugPage({
  params,
}: PageProps<'/solutions/[slug]'>) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    notFound()
  }

  return <SolutionDetailPage solution={solution} />
}
