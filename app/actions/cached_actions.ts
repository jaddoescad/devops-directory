"use server"

import "server-only"
import { unstable_cache } from "next/cache"
import { createClient } from "@supabase/supabase-js"

type FilterData = {
  categories: { id: string; code: string, name: string }[]
}

type CategoryData = {
  id: string
  name: string
  code: string
}


const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
async function getFilters(): Promise<FilterData> {
  const { data: categoriesData, error: categoriesError } = await client
    .from("categories")
    .select("id, name, code")
 
    

  if (categoriesError) {
    console.error(
      "Error fetching filters:",
      categoriesError
    )
    return { categories: [] }
  }


  const categories = categoriesData
    ? categoriesData.map((item: CategoryData) => ({
        id: item.id,
        name: item.name,
        code: item.code
      })).filter(item => item.name && item.code)
    : []

  console.log("categories", categories);

  return {
    categories: categories.map(({ id, name, code }) => ({ id, name, code }))
  }
}

export const getCachedFilters = unstable_cache(
  async (): Promise<FilterData> => {
    const { categories } = await getFilters()
    return { categories }
  },
  ["product-filters"],
  { tags: [`product_filters`], revalidate: 9000 }
)

export const getCategoryNameFromCode = unstable_cache(
  async (code: string): Promise<string | null> => {
    const { data, error } = await client
      .from("categories")
      .select("name")
      .eq("code", code)
      .single()

    if (error) {
      console.error("Error fetching category name:", error)
      return null
    }

    return data?.name || null
  },
  ["category-name"],
  { tags: [`category_name`], revalidate: 9000 }
)
