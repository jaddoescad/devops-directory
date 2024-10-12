"use client"

import { useOptimistic } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PersonStanding, Tag, View } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import MinimalCard, {
  MinimalCardContent,
  MinimalCardDescription,
  MinimalCardFooter,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/cult/minimal-card"
import { incrementClickCount } from "@/app/actions/product"

export const getBasePath = (url: string) => {
  return new URL(url).hostname.replace("www.", "").split(".")[0]
}

export const getLastPathSegment = (url: string, maxLength: number): string => {
  try {
    const pathname = new URL(url).pathname
    const segments = pathname.split("/").filter(Boolean)
    const lastSegment = segments.pop() || ""

    if (lastSegment.length > maxLength) {
      return `/${lastSegment.substring(0, maxLength)}`
    }

    return lastSegment ? `/${lastSegment}` : ""
  } catch (error) {
    console.error("Invalid URL:", error)
    return ""
  }
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

export const ResourceCard: React.FC<{
  trim?: boolean
  data: Product
  order: any
}> = ({ trim, data, order }) => {
  const [optimisticResource, addOptimisticUpdate] = useOptimistic<
    Product,
    Partial<Product>
  >(data, (currentResource, newProperties) => {
    return { ...currentResource, ...newProperties }
  })

  const handleClick = () => {
    const newClickCount = (optimisticResource.view_count || 0) + 1
    addOptimisticUpdate({ view_count: newClickCount })
    incrementClickCount(data.id)
  }

  return (
    <div>
      <motion.div
        key={`resource-card-${data.id}-${order}`}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative break-inside-avoid w-full h-full"
      >
        <Link
          href={`/products/${data.id}`}
          key={`/products/${data.id}`}
          className="block w-full h-full"
          onClick={handleClick}
        >
          <div className="w-[250px] h-[320px] bg-white rounded-lg overflow-hidden flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="h-[150px] w-full relative">
              <Image
                src={data.logo_src || '/placeholder-image.jpg'}
                alt={data.codename}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1 bg-white p-4 flex flex-col">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2">
                {data.codename}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                {data.description}
              </p>
              <div className="mt-auto flex items-center justify-end text-sm text-gray-500">
                <View className="w-4 h-4 mr-1" />
                <span>{optimisticResource.view_count || data.view_count}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
