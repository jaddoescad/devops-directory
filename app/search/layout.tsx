import { PropsWithChildren } from "react"
import { NavigationBar } from "@/components/navigation-bar"
import { getCachedFilters } from "../actions/cached_actions"
import { createClient } from "@/db/supabase/server"
import { FadeIn } from "@/components/cult/fade-in"

export default async function SearchLayout({ children }: PropsWithChildren) {
  const supabase = createClient()
  
  // Fetch filters and user in parallel
  const [filters, { data: { user } }] = await Promise.all([
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
      <FadeIn className="flex-grow flex">
        <div className="w-full mx-auto flex flex-col md:px-4 pb-12 relative ">
          {children}
        </div>
      </FadeIn>
    </div>
  )
}