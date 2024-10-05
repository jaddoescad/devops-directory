import { FadeIn } from "@/components/cult/fade-in"
import { Hero } from "@/components/hero"

import {
  ResourceCardGrid,
} from "../components/directory-card-grid"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"

// Select the resources you want to feature.. AD SPACE?
const FEATURED_IDS = [
  // "3b741434-1bdb-4903-91e9-a7fa154a8fdf",
  // "f8a5db00-c80e-4fe4-80a7-af9d79a03690",
  // "ad4b9d2e-6461-4eed-afbf-86aa284000cc",
  "",
] // Replace 'id1', 'id2', 'id3' with actual IDs you want to feature

async function Page({ searchParams }: { searchParams: { search?: string } }) {
  let data = await getProducts(searchParams.search)
  let filters = await getCachedFilters()
  const filteredFeaturedData = data.filter((d: any) =>
    FEATURED_IDS.includes(d.id)
  )

  return (
    <>
      <Hero categories={filters.categories} labels={filters.labels} tags={filters.tags} />

      <FadeIn>
        <ResourceCardGrid
          sortedData={data}
          filteredFeaturedData={filteredFeaturedData}
        >
        </ResourceCardGrid>
      </FadeIn>
    </>
  )
}

export default Page
