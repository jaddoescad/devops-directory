"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BoxIcon, ChevronDown, Hash, PlusIcon, TagIcon, Menu, X } from "lucide-react"
import { useState } from "react"

import { cn, truncateString } from "@/lib/utils"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="p-4">
      {/* Desktop version */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
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
                Submit tool
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
        </div>
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </Button>
            <h1 className="text-xl font-bold">CourseHero</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/submit">Submit</Link>
            </Button>
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <DirectorySearch />
        </div>

        {/* Side Navigation */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)} className="mb-4">
              <X />
            </Button>
            {categories && categories.length > 0 && (
              <div className="mb-4">
                <h2 className="font-semibold mb-2">Categories</h2>
                <ul className="space-y-1">
                  {categories.map((category, index) => (
                    <li key={`category-${index}-${category}`}>
                      <Link
                        href={`/products?category=${category}`}
                        prefetch={false}
                        className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{category && truncateString(category, 20)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Tags</h2>
              <ul className="space-y-1">
                {tags && tags.map((tag, index) => (
                  <li key={`tag-${index}-${tag}`}>
                    <Link
                      href={`/products?tag=${tag}`}
                      prefetch={false}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{tag && truncateString(tag, 20)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Labels</h2>
              <ul className="space-y-1">
                {labels && labels.map((label, index) => (
                  <li key={`label-${index}-${label}`}>
                    <Link
                      href={`/products?label=${label}`}
                      prefetch={false}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{label && truncateString(label, 20)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
