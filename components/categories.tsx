'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn, truncateString } from "@/lib/utils"

type Category = {
  id: string
  name: string
  code: string
}

export function Categories({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams()

  if (!categories || categories.length === 0) return null

  return (
    <div className="overflow-x-auto whitespace-nowrap p-4 border-b flex justify-center">
      <div className="flex space-x-2">
        <Link
          href="/products"
          prefetch={false}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !searchParams.get('category')
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={`category-${category.id}`}
            href={`/products?category=${category.code}`}
            prefetch={false}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              searchParams.get('category') === category.code
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {category.name && truncateString(category.name, 20)}
          </Link>
        ))}
      </div>
    </div>
  )
}
