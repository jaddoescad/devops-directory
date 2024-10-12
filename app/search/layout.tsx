import { PropsWithChildren } from "react"

import { FadeIn } from "@/components/cult/fade-in"

export default async function SearchLayout({ children }: PropsWithChildren) {
  
  return (
      <FadeIn className="flex-grow">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </FadeIn>
  )
}