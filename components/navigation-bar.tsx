"use client"

import Link from "next/link"
import Image from "next/image"

import { UserAvatar } from "./avatar-dropdown"
import { DirectorySearch } from "./directory-search"
import { Button } from "./ui/button"
import logo from "@/assets/logo.png"

export function NavigationBar({
  user,
  blogEnabled,
  children
}: {
  labels?: string[]
  tags?: string[]
  user: any
  blogEnabled?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 border-b">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 flex-grow">
            <Link href="/" className="flex-shrink-0">
              <Image src={logo} alt="Logo" width={175} height={100} className="w-[175px] h-auto" />
            </Link>
            <div className="hidden md:block w-full max-w-md">
              <DirectorySearch />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {blogEnabled && (
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link href="/blog">Blog</Link>
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm" 
              asChild 
              className="bg-[#0097b2] hover:bg-[#0097b2]/90 text-white !bg-none !border-none"
            >
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
        <div className="md:hidden mt-4">
          <DirectorySearch />
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}
