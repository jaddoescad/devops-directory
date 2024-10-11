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
    <div className="max-w-full pt-4 flex-grow flex flex-col">
      <h1 className="text-3xl font-bold mb-4">
        Search results for: {searchQuery || "All products"}
      </h1>
      <ResourceCardGrid sortedData={data} filteredFeaturedData={null} />
    </div>
  )
}