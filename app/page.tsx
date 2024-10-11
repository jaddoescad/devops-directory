import { ReactElement } from "react"
import { FadeIn } from "@/components/cult/fade-in"
import { Categories } from "@/components/categories"
import { ResourceCardGrid } from "../components/directory-card-grid"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"
import { createClient } from "@/db/supabase/server"

export const dynamic = "force-dynamic"

type Category = {
  id: string
  name: string
  code: string
}

async function Page({
  searchParams,
}: {
  searchParams: {
    category?: string
    label?: string
    tag?: string
  }
}): Promise<ReactElement> {
  const { category, label, tag } = searchParams

  const [data, filters] = await Promise.all([
    getProducts(undefined, category, label, tag),
    getCachedFilters(),
  ])

  return (
    <>
      <Categories categories={filters.categories as Category[]} />
      <FadeIn className="flex-grow">
        <div className="max-w-full pt-4">
          <ResourceCardGrid sortedData={data} filteredFeaturedData={null} />
        </div>
      </FadeIn>
    </>
  )
}

export default Page
