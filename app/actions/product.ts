"use server"

import "server-only"
import { cache } from "react"
import { revalidatePath } from "next/cache"
import { createClient } from "@/db/supabase/server"

export async function getFilters() {
  const db = createClient()
  const { data: categoriesData, error: categoriesError } = await db
    .from("devops_courses")
    .select("categories")

  const { data: labelsData, error: labelsError } = await db
    .from("devops_courses")
    .select("labels")

  const { data: tagsData, error: tagsError } = await db
    .from("devops_courses")
    .select("tags")

  if (categoriesError || labelsError || tagsError) {
    console.error(
      "Error fetching filters:",
      categoriesError,
      labelsError,
      tagsError
    )
    return { categories: [], labels: [], tags: [] }
  }

  return {
    categories: categoriesData.map((item) => item.categories).filter(Boolean),
    labels: labelsData.map((item) => item.labels).filter(Boolean),
    tags: tagsData.map((item) => item.tags).filter(Boolean),
  }
}

export const getProducts = cache(
  async (
    searchTerm?: string,
    category?: string
  ) => {
    const db = createClient()
    let query = db
      .from("devops_courses")
      .select('*')

    if (searchTerm) {
      query = query.or(
        `codename.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,punchline.ilike.%${searchTerm}%`
      )
    }

    if (category) {
      query = query.contains('categories', [category])
    }

    const { data, error } = await query

    if (error) {
      console.error("Error searching resources:", error)
      return []
    }

    return data || []
  }
)

export const getProductsByCategory = cache(async () => {
  const db = createClient()
  const { data, error } = await db
    .from("devops_courses")
    .select(`
      *,
      categories:categories(id, name)
    `)
    .order('categories->name')

  if (error) {
    console.error("Error fetching products by category:", error)
    return []
  }

  const groupedProducts = data.reduce((acc, product) => {
    const categoryName = product.categories?.name || 'Uncategorized'
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push({
      ...product,
      category_name: categoryName
    })
    return acc
  }, {})

  return groupedProducts
})

export async function getProductById(id?: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("devops_courses")
    .select('*')
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export async function incrementClickCount(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc("increment_product_view_count", {
    product_id: id,
  })

  if (error) {
    console.error("Error incrementing click count:", error)
  } else {
    console.log("Click count incremented:", data)
  }

  revalidatePath("/products")
}
