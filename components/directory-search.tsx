"use client"

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { InputButton } from "@/components/ui/input"

import { IconSpinner } from "./ui/icons"

export function DirectorySearch() {
  let router = useRouter()

  let [isPending, startTransition] = useTransition()
  let [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (term: string) => {
    if (term) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(term)}`)
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm)
    }
  }

  return (
    <div className="relative max-w-[90%] md:min-w-[4rem] w-full md:max-w-[42ch] md:mr-auto">
      <InputButton
        hasIcon
        id="search"
        className={cn(
          "relative pr-10 pl-12 md:py-2 w-full rounded-md",
          "border border-gray-300",
          "font-normal placeholder:text-gray-400",
          "text-md"
        )}
        tabIndex={0}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={searchTerm}
        placeholder="Search all courses"
        spellCheck={false}
        enterKeyHint="go"
      >
        <div className="relative -ml-10 hidden items-center justify-center md:flex">
          <div className="absolute ml-4 w-12 rounded-r-full"> 
            <AnimatePresence>
              {isPending ? (
                <IconSpinner className="-ml-0.5 h-5 w-5 animate-spin stroke-teal-600 group-hover:stroke-teal-700" />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </InputButton>
    </div>
  )
}
