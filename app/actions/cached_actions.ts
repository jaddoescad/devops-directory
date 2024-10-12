"use server"

import "server-only"
import { unstable_cache } from "next/cache"
import { createClient } from "@supabase/supabase-js"

type FilterData = {
  categories: { id: string; code: string, name: string }[]
}

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getFilters(): Promise<FilterData> {
  const { data: coursesData, error: coursesError } = await client
    .from("devops_courses")
    .select("categories")

  if (coursesError) {
    console.error(
      "Error fetching filters:",
      coursesError
    )
    return { categories: [] }
  }

  const allCategories = coursesData.flatMap(course => course.categories)
  const uniqueCategories = [...new Set(allCategories)]

  const categories = uniqueCategories.map((category, index) => ({
    id: index.toString(),
    name: category,
    code: category.toLowerCase().replace(/\s+/g, '-')
  }))

  console.log("categories", categories);

  return { categories }
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
    const { categories } = await getFilters()
    const category = categories.find(cat => cat.code === code)
    return category ? category.name : null
  },
  ["category-name"],
  { tags: [`category_name`], revalidate: 9000 }
)
