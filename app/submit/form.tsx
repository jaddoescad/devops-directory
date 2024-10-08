"use client"

import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GradientHeading } from "@/components/cult/gradient-heading"

import { StyledButton } from "../login/submit-button"
import { onSubmitToolAction } from "./action"
import { schema } from "./schema"

export const SubmitTool = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [state, formAction] = useFormState(onSubmitToolAction, {
    message: "",
    issues: [],
  })

  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      courseUrl: "",
      ...(state?.fields ?? {}),
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message && state.issues.length < 1) {
      toast.success(state.message)
      setError(null)
    } else if (state.issues.length >= 1) {
      setError(state.issues.join(", "))
    }
    setLoading(false)
  }, [state.message, state.issues])

  return (
    <Form {...form}>
      {error && (
        <div className="text-red-500 mb-4">
          <p className="flex items-center gap-1">
            <X className="h-4 w-4" />
            {error}
          </p>
        </div>
      )}
      <form
        ref={formRef}
        className="space-y-8"
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault()
          if (!form.formState.isValid) {
            setError("Please fill out all required fields correctly.")
            return
          }
          setLoading(true)
          setError(null)
          form.handleSubmit(async (data) => {
            let formData = new FormData(formRef.current!)
            await formAction(formData)
          })(evt)
        }}
      >
        <GradientHeading size="xs">
          Submit your course
        </GradientHeading>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course URL</FormLabel>
                <FormControl>
                  <Input placeholder="Your course URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <StyledButton disabled={loading} type="submit">
          Submit
        </StyledButton>
      </form>
    </Form>
  )
}

export default SubmitTool
