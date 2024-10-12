import { ReactElement } from "react"
import { FadeIn } from "@/components/cult/fade-in"
import { Categories } from "@/components/categories"
import { ResourceCardGrid } from "../components/directory-card-grid"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"

export const dynamic = "force-dynamic"

async function Page({
  searchParams,
}: {
  searchParams: {
    category?: string
  }
}): Promise<ReactElement> {
  const { category } = searchParams

  const [data, filters] = await Promise.all([
    getProducts(undefined, category),
    getCachedFilters(),
  ])

  return (
    <>
      <Categories categories={filters.categories} />
      <FadeIn className="flex-grow">
        <div className="max-w-full pt-4">
          <ResourceCardGrid sortedData={data} filteredFeaturedData={null} />
        </div>
      </FadeIn>
    </>
  )
}

export default Page
