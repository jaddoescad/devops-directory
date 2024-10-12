import { PropsWithChildren } from "react"

export default async function AccountLayout({ children }: PropsWithChildren) {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}