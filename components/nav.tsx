"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  BoxIcon,
  Hash,
  HomeIcon,
  LogIn,
  PlusIcon,
  TagIcon,
  ChevronDown,
} from "lucide-react"

import { cn, truncateString } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


type ProductNavProps = {
  categories?: string[]
  tags?: string[]
  labels?: string[]
  searchParams: URLSearchParams
  children?: ReactNode
}

function ProductNav({
  categories,
  tags,
  labels,
  searchParams,
  children,
}: ProductNavProps) {
  return (
    <div className="">
      {children}
      <ScrollArea className="h-[calc(100vh-320px)] md:h-[calc(100vh-200px)] flex flex-col gap-4 pl-2">
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
      </ScrollArea>
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
      <CollapsibleTrigger className="flex items-center justify-between w-full text-muted-foreground hover:text-foreground">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm">{title}</span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="mt-2 w-36 flex flex-col gap-2 items-start justify-center py-2">
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