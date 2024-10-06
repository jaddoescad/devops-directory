"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BoxIcon, ChevronDown, Hash, PlusIcon, TagIcon } from "lucide-react"

import { cn, truncateString } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { UserAvatar } from "./avatar-dropdown"
import { DirectorySearch } from "./directory-search"
import { Button } from "./ui/button"
import * as Popover from '@radix-ui/react-popover'

export function NavigationBar({
  categories,
  labels,
  tags,
  user,
}: {
  categories?: string[]
  labels?: string[]
  tags?: string[]
  user: any
}) {
  const searchParams = useSearchParams()

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4 w-1/3">
        <h1 className="text-xl font-bold">CourseHero</h1>
        <NavDropdown
          title="Categories"
          items={categories}
          searchParams={searchParams}
          paramName="category"
        />
      </div>

      <div className="flex-grow flex justify-center w-1/3">
        <DirectorySearch />
      </div>

      <div className="flex items-center justify-end space-x-4 w-1/3">
        <NavDropdown
          title="Tags"
          items={tags}
          searchParams={searchParams}
          paramName="tag"
        />
        <NavDropdown
          title="Labels"
          items={labels}
          searchParams={searchParams}
          paramName="label"
        />
        <Button variant="secondary" asChild>
          <Link href="/submit">
            <PlusIcon className="mr-2" /> Submit tool
          </Link>
        </Button>
        {user ? (
          <UserAvatar user={user} />
        ) : (
          <Button variant="outline" asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>
        )}
      </div>
    </nav>
  )
}

type NavDropdownProps = {
  title: string
  items?: string[]
  searchParams: URLSearchParams
  paramName: string
}

function NavDropdown({
  title,
  items,
  searchParams,
  paramName,
}: NavDropdownProps) {
  if (!items || items.length === 0) return null

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1">
          <span>{title}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white rounded-md shadow-lg p-2 z-50">
          <ul className="space-y-1">
            {items.map((item: string, index: number) => (
              <li key={`${paramName}-${index}-${item}`}>
                <Link
                  href={`/products?${paramName}=${item}`}
                  prefetch={false}
                  className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                >
                  <span>{item && truncateString(item, 20)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
