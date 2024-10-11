import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavigationBar } from "@/components/navigation-bar"
import { Footer } from "@/components/footer"
import { getCachedFilters } from "./actions/cached_actions"
import { createClient } from "@/db/supabase/server"
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const [filters, { data: { user } }] = await Promise.all([
    getCachedFilters(),
    supabase.auth.getUser()
  ])

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <NavigationBar 
          labels={filters.labels} 
          tags={filters.tags}
          user={user}
        >
          {children}
        </NavigationBar>
        <Footer />
      </body>
    </html>
  )
}
