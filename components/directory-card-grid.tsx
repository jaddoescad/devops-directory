"use client"

import React, { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { ResourceCard } from "./directory-product-card"

interface Product {
  id: string
  created_at: string
  full_name: string
  email: string
  product_website: string
  codename: string
  punchline: string
  description: string
  logo_src: string
  user_id: string
  tags: string[]
  view_count: number
  approved: boolean
  labels: string[]
  categories: string
}

export interface SEOCardGridProps {
  sortedData: Product[]
  filteredFeaturedData: Product[] | null
  children?: React.ReactNode
}

interface Product {
  id: string
  created_at: string
  full_name: string
  email: string
  product_website: string
  codename: string
  punchline: string
  description: string
  logo_src: string
  user_id: string
  tags: string[]
  view_count: number
  approved: boolean
  labels: string[]
  categories: string
}

export interface SEOCardGridProps {
  sortedData: Product[]
  filteredFeaturedData: Product[] | null
  children?: React.ReactNode
}

export const ResourceCardGrid: React.FC<SEOCardGridProps> = ({
  sortedData,
  children,
}) => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col md:items-start gap-4 overflow-hidden pb-4 relative flex-grow">
      {children}
      <div className="w-full h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="relative h-full">
            <TailwindMasonryGrid filteredData={sortedData} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

interface TailwindMasonryGridProps {
  filteredData: Product[]
}

const TailwindMasonryGrid: React.FC<TailwindMasonryGridProps> = ({
  filteredData,
}) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1600px]">
        <div className="flex flex-wrap justify-center gap-2">
          {filteredData &&
            filteredData.map((data, index) => (
              <div key={`${index}-${data.id}`}>
                <ResourceCard data={data} order={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export const FeaturedGrid: React.FC<{ featuredData: Product[] }> = ({
  featuredData,
}) => {
  return (
    <div className="w-full mx-auto max-w-7xl bg-neutral-50/40 border border-dashed border-black/10 py-3 px-3 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {featuredData.map((data, index) => (
          <ResourceCard trim={true} data={data} order={index} />
        ))}
      </div>
    </div>
  )
}

export const EmptyFeaturedGrid = () => {
  const emptyData = [
    {
      codename: "Join the cult",
      punchline: "Next.j, Supabase & Tailwind Starters",
      product_website: "https://newcult.co",
      description:
        "Check out newcult.co for the premium version of this template",
      logo_src: "/ad-placeholder-metrics.png",
      tags: ["featured"],
      labels: ["featured-ad"],
    },
    {
      codename: "To get Admin Dashboard",
      product_website: "https://newcult.co",
      punchline: "Next.j, Supabase & Tailwind Starters",
      description:
        "Join the cult and get access to the admin dashboard for this template.",
      logo_src: "/ad-placeholder-1.png",
      tags: ["featured"],
      labels: ["featured-ad"],
    },
    {
      codename: "And AI scripts",
      product_website: "https://newcult.co",
      punchline: "Next.j, Supabase & Tailwind Starters",
      description:
        "Includes AI scripts to quickly add new products to your directory..",
      logo_src: "/ad-placeholder-tags.png",
      tags: ["featured"],
      labels: ["featured-ad"],
    },
  ]

  return (
    <div className="w-full mx-auto max-w-7xl bg-black/20 border border-dashed border-black/10 py-3 px-3 rounded-[1.9rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {emptyData.map((data, index) => (
          <Link
            href="https://newcult.co"
            target="_blank"
            rel="noreferrer noopener"
            key={`featured-${index}-${data.codename}`}
            className="md:py-0"
          >
            {/* @ts-expect-error */}
            <ResourceCard trim={true} data={data} order={index} />
          </Link>
        ))}
      </div>
    </div>
  )
}
