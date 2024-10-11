"use client"

import Link from "next/link"
import { PlusIcon } from "lucide-react"
import Image from "next/image"

import { UserAvatar } from "./avatar-dropdown"
import { DirectorySearch } from "./directory-search"
import { Button } from "./ui/button"
import logo from "@/assets/logo.png"

export function NavigationBar({
  labels,
  tags,
  user,
  children
}: {
  labels?: string[]
  tags?: string[]
  user: any
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src={logo} alt="Logo" width={175} height={100} className="w-[175px] h-auto" />
          </Link>
          
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

      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}
