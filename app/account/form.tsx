"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/db/supabase/client"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"
import { Edit2Icon, SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SubmitButton } from "../login/submit-button"

export function AccountForm({ user }: { user: User }) {
  const router = useRouter()

  const handleResetPassword = async (formData: FormData) => {
    const email = formData.get("email") as string
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/login/password`,
    })
    if (error) {
      toast.error(`Failed to send reset instructions: ${error.message}`)
    } else {
      toast.success("Check your email to reset password")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Account Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email || ""}
              disabled
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Change Password</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit2Icon className="w-4 h-4 mr-2" /> Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Enter your email to receive password reset instructions.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user.email || ""}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <SubmitButton
                  formAction={handleResetPassword}
                  className="w-full"
                  pendingText="Sending Instructions..."
                >
                  Send Reset Instructions
                </SubmitButton>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>
    </div>
  )
}