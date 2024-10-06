import { PropsWithChildren } from "react"
import { NavigationBar } from "@/components/navigation-bar"
import { getCachedFilters } from "../actions/cached_actions"
import { createClient } from "@/db/supabase/server"

export default async function AccountLayout({ children }: PropsWithChildren) {
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
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}