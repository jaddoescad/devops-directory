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
  title: "All DevOps Courses | Comprehensive Directory of DevOps Training",
  description: "Discover the best DevOps courses from across the internet. Our curated directory helps you find the perfect DevOps training to advance your career in cloud, automation, and continuous integration.",
  keywords: "DevOps courses, DevOps training, cloud computing, automation, CI/CD, continuous integration, continuous deployment",
  openGraph: {
    title: "All DevOps Courses | Find the Best DevOps Training Online",
    description: "Explore our comprehensive directory of DevOps courses from top platforms. Advance your career with the right DevOps skills.",
    type: "website",
    url: "https://alldevopscourses.com", // Replace with your actual URL
    images: [
      {
        url: "https://alldevopscourses.com/og-image.jpg", // Replace with your actual Open Graph image URL
        width: 1200,
        height: 630,
        alt: "All DevOps Courses Logo",
      },
    ],
  },
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
        <NextTopLoader 
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <NavigationBar 
          labels={filters.labels} 
          tags={filters.tags}
          user={user}
          blogEnabled={true}
        >
          {children}
        </NavigationBar>
        <Footer />
      </body>
    </html>
  )
}
