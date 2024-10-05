import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/db/supabase/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UserAvatar() {
  const router = useRouter()

  const handleLogout = async () => {
    const db = await createClient()
    const { error } = await db.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message)
    } else {
      router.push("/login") // Redirect to login page after logout
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="bg-gradient-to-r from-yellow-300 to-yellow-300" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-gradient-to-t from-primary/70 to-primary/80 rounded-lg"
      >
        <div className="p-[1px] bg-background rounded-md">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary" />
          <DropdownMenuItem>
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-primary" />
          <DropdownMenuItem>
            <Button className="w-full" onClick={handleLogout}>
              <LogOutIcon className="mr-1 size-4" /> Logout
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}