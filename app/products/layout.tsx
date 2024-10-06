import { PropsWithChildren } from "react"
import { NavigationBar } from "@/components/navigation-bar"
import { getCachedFilters } from "../actions/cached_actions"
import { createClient } from "@/db/supabase/server"

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient()
  
  // Fetch filters and user in parallel
  const [filters, { data: { user } }] = await Promise.all([
    getCachedFilters(),
    supabase.auth.getUser()
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar 
        categories={filters.categories} 
        labels={filters.labels} 
        tags={filters.tags}
        user={user}
      />
      <div className="mx-auto flex flex-1 flex-col md:px-4 pb-12 relative">
        {children}
      </div>
    </div>
  )
}
