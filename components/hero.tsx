'use client'
import Link from "next/link"
import { PlusIcon, BoxIcon, TagIcon, Hash, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { DirectorySearch } from "./directory-search"
import { UserAvatar } from "./avatar-dropdown"
import { useSearchParams } from "next/navigation"
import { cn, truncateString } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Hero({ categories, labels, tags }: {
  categories?: string[]
  labels?: string[]
  tags?: string[]
}) {
  const searchParams = useSearchParams()

  return (
    <div className="w-full bg-red-200 flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-4">CourseHero</h1>
        <DirectorySearch />
      </div>
      <div className="flex items-center gap-4">
        <NavDropdown
          title="Categories"
          icon={<BoxIcon className="size-5 stroke-yellow-400" />}
          items={categories}
          searchParams={searchParams}
          paramName="category"
          bgColor="bg-yellow-400"
        />
        <NavDropdown
          title="Tags"
          icon={<TagIcon className="size-5 stroke-pink-400" />}
          items={tags}
          searchParams={searchParams}
          paramName="tag"
          bgColor="bg-pink-400"
        />
        <NavDropdown
          title="Labels"
          icon={<Hash className="size-5 stroke-cyan-400" />}
          items={labels}
          searchParams={searchParams}
          paramName="label"
          bgColor="bg-cyan-400"
        />
        <Button variant="secondary" asChild>
          <Link href="/submit" className="flex items-center text-black">
            <PlusIcon className="size-4 mr-1" /> Submit tool
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login" className="text-black">
            Login
          </Link>
        </Button>
        <UserAvatar />
      </div>
    </div>
  )
}

type NavDropdownProps = {
  title: string
  icon: React.ReactNode
  items?: string[]
  searchParams: URLSearchParams
  paramName: string
  bgColor: string
}

function NavDropdown({ title, icon, items, searchParams, paramName, bgColor }: NavDropdownProps) {
  if (!items || items.length === 0) return null

  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center justify-between text-muted-foreground hover:text-foreground">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm">{title}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="absolute mt-2 w-36 flex flex-col gap-2 items-start justify-center py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
          {items.map((item: string, index: number) => (
            <li key={`${paramName}-${index}-${item}`}>
              <Link
                href={`/products?${paramName}=${item}`}
                className={cn(
                  "flex items-start space-x-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 rounded-md px-2 py-0.5",
                  "shadow-[0_0_0_1px_rgba(0,0,0,0.1)_inset,0_0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_-0.5px_0.5px_rgba(0,0,0,0.05)_inset,0_1px_2px_rgba(0,0,0,0.1)]",
                  "dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.06)_inset,0_0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_-0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_0.5px_1px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.4)]",
                  "dark:hover:shadow-[0_0_0_0.5px_rgba(255,255,255,0.1)_inset,0_0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_-0.5px_0.5px_rgba(255,255,255,0.1)_inset,0_0.5px_1px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.5)]",
                  searchParams.get(paramName) === item
                    ? `${bgColor} text-black dark:text-black`
                    : ""
                )}
                prefetch={false}
              >
                <span className="px-1 truncate">
                  {item && truncateString(item, 12)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}