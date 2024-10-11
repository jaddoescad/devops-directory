import { ReactElement } from "react"
import { FadeIn } from "@/components/cult/fade-in"
import { Categories } from "@/components/categories"
import { ResourceCardGrid } from "../components/directory-card-grid"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"
import { createClient } from "@/db/supabase/server"
import { GradientHeading } from "@/components/cult/gradient-heading"
import { Hash, TagIcon } from "lucide-react"

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
  const { category: categoryCode } = searchParams

  const [data, filters] = await Promise.all([
    getProducts(undefined, categoryCode),
    getCachedFilters(),
  ])

  return (
    <>
      <Categories categories={filters.categories as Category[]} />
      <FadeIn className="flex-grow">
        <div className="max-w-full pt-4">
          <ResourceCardGrid sortedData={data} filteredFeaturedData={null}>
            {label || tag ? (
              <div className="md:mr-auto mx-auto flex flex-col items-center md:items-start">
                <div className="flex mb-1 justify-center md:justify-start">
                  {label && <Hash className="mr-1 bg-gray-200 fill-blue-300/30 stroke-blue-600 size-6 p-1 rounded-full" />}
                  {tag && <TagIcon className="mr-1 bg-gray-200 fill-blue-300/30 stroke-blue-600 size-6 p-1 rounded-full" />}
                  {label ? "label" : "tag"}
                </div>
                <GradientHeading size="xxl">
                  {label || tag}
                </GradientHeading>
              </div>
            ) : null}
          </ResourceCardGrid>
        </div>
      </FadeIn>
    </>
  )
}

export default Page
