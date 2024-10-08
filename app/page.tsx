import { FadeIn } from "@/components/cult/fade-in"
import { NavigationBar } from "@/components/navigation-bar"
import { ResourceCardGrid } from "../components/directory-card-grid"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"
import { createClient } from "@/db/supabase/server"

const FEATURED_IDS = [""]

async function Page() {
  const supabase = createClient()
  
  const [data, filters, { data: { user } }] = await Promise.all([
    getProducts(),
    getCachedFilters(),
    supabase.auth.getUser()
  ])

  const filteredFeaturedData = data.filter((d: any) =>
    FEATURED_IDS.includes(d.id)
  )

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar 
        categories={filters.categories} 
        labels={filters.labels} 
        tags={filters.tags}
        user={user}
      />

      <FadeIn className="flex-grow flex">
        <ResourceCardGrid
          sortedData={data}
          filteredFeaturedData={filteredFeaturedData}
        />
      </FadeIn>
    </div>
  )
}

export default Page
