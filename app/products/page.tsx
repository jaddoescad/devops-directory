import { ReactElement } from "react";
import { BoxIcon, Hash, Search, TagIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/cult/fade-in";
import { GradientHeading } from "@/components/cult/gradient-heading";
import { ResourceCardGrid } from "@/components/directory-card-grid"

import { getCachedFilters, getCategoryNameFromCode } from "../actions/cached_actions"
import { getProducts } from "../actions/product"

export const dynamic = "force-dynamic"

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
  const data = await getProducts(undefined, categoryCode, label, tag)
  let filters = await getCachedFilters()

  // Fetch the category name using the new function
  const categoryName = categoryCode 
    ? await getCategoryNameFromCode(categoryCode)
    : null

  return (
    <>
      <div className="max-w-full pt-4">
        <FadeIn>
          {categoryName && (
            <h1 className="text-4xl font-bold mb-6 text-center">{categoryName}</h1>
          )}
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
        </FadeIn>
      </div>
    </>
  )
}