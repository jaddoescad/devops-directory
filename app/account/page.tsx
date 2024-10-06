import { createClient } from "@/db/supabase/server"
import { redirect } from "next/navigation"

import { AccountForm } from "./form"

export default async function AccountPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <AccountForm user={user} />
}