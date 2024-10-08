import { FadeIn } from "@/components/cult/fade-in"
import { NavigationBar } from "@/components/navigation-bar"
import { ResourceCardGrid } from "../components/directory-card-grid"
import { getCachedFilters } from "./actions/cached_actions"
import { getProductsByCategory } from "./actions/product"
import { createClient } from "@/db/supabase/server"

async function Page() {
  const supabase = createClient()
  
  const [groupedProducts, filters, { data: { user } }] = await Promise.all([
    getProductsByCategory(),
    getCachedFilters(),
    supabase.auth.getUser()
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar 
        categories={filters.categories} 
        labels={filters.labels} 
        tags={filters.tags}
        user={user}
      />

      <FadeIn className="flex-grow">
        <div className="container mx-auto px-4">
          {Object.entries(groupedProducts).map(([category, products]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <ResourceCardGrid sortedData={products} />
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}

export default Page
