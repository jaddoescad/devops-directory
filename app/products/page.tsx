import { ReactElement } from "react";

import { FadeIn } from "@/components/cult/fade-in";
import { ResourceCardGrid } from "@/components/directory-card-grid"
import { Categories } from "@/components/categories"

import { getCachedFilters } from "../actions/cached_actions"
import { getProducts } from "../actions/product"

export const dynamic = "force-dynamic"

type Category = {
  id: string
  name: string
  code: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    category?: string
    label?: string
    tag?: string
  }
}): Promise<ReactElement> {
  const { category: categoryCode, label, tag } = searchParams
  const [data, filters] = await Promise.all([
    getProducts(undefined, categoryCode, label, tag),
    getCachedFilters()
  ])


  return (
    <>
      <Categories categories={filters.categories as unknown as Category[]} />
      <div className="max-w-full pt-4">
        <FadeIn>
          <ResourceCardGrid sortedData={data} filteredFeaturedData={null} />
        </FadeIn>
      </div>
    </>
  )
}
