import { PropsWithChildren } from "react"
import { getCachedFilters } from "../actions/cached_actions"
import { createClient } from "@/db/supabase/server"
import { FadeIn } from "@/components/cult/fade-in"

export default async function SearchLayout({ children }: PropsWithChildren) {
  const supabase = createClient()
  
  const [filters, { data: { user } }] = await Promise.all([
    getCachedFilters(),
    supabase.auth.getUser()
  ])

  return (
      <FadeIn className="flex-grow">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </FadeIn>
  )
}