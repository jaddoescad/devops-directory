"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BoxIcon, ChevronDown, Hash, PlusIcon, TagIcon, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

import { cn, truncateString } from "@/lib/utils"

import { UserAvatar } from "./avatar-dropdown"
import { DirectorySearch } from "./directory-search"
import { Button } from "./ui/button"
import * as Popover from '@radix-ui/react-popover'
import logo from "@/assets/logo.png"

export function NavigationBar({
  categories,
  labels,
  tags,
  user,
  children
}: {
  categories?: string[]
  labels?: string[]
  tags?: string[]
  user: any
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <div className="flex">
      {/* Side Navigation */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 z-20`}>
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

      {/* Main Content */}
      <div className={`flex-1 transition-margin duration-300 ease-in-out ${isMenuOpen ? 'ml-64' : ''}`}>
        <nav className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              {!isMenuOpen && (
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)}>
                  <Menu />
                </Button>
              )}
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image src={logo} alt="Logo" width={175} height={100} className="w-[175px] h-auto" />
              </Link>
            </div>
            
            <div className="w-full sm:w-auto">
              <DirectorySearch />
            </div>
            
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <Button variant="default" size="sm" asChild className="bg-black text-white hover:bg-black/90">
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
        </nav>
        {children}
      </div>
    </div>
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
