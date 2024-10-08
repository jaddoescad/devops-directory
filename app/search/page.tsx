import { ReactElement } from "react";
import { Search } from "lucide-react";
import { GradientHeading } from "@/components/cult/gradient-heading";
import { ResourceCardGrid } from "@/components/directory-card-grid"
import { getProducts } from "../actions/product"

export const dynamic = "force-dynamic"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}): Promise<ReactElement> {
  const { q: searchQuery } = searchParams
  const data = await getProducts(searchQuery)

  return (
    <div className="max-w-full pt-4 flex-grow flex">
      <ResourceCardGrid sortedData={data} filteredFeaturedData={null}>
        <div className="md:mr-auto mx-auto flex flex-col items-center md:items-start">
          <div className="flex mb-1 justify-center md:justify-start">
            <Search className="mr-1 bg-gray-200 fill-blue-300/30 stroke-blue-600 size-6 p-1 rounded-full" />
            <span>Search Results</span>
          </div>
          <GradientHeading size="xxl">
            {searchQuery || "All Products"}
          </GradientHeading>
        </div>
      </ResourceCardGrid>
    </div>
  )
}