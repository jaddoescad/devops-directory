"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUploader } from "@/components/cult/file-drop"
import { GradientHeading } from "@/components/cult/gradient-heading"
import { createClient } from "@/db/supabase/client"

import { StyledButton } from "../login/submit-button"
import { onSubmitToolAction } from "./action"
import { schema } from "./schema"

// To trigger async toast
const p = () => new Promise((resolve) => setTimeout(() => resolve(""), 900))

export const SubmitTool = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const router = useRouter()

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
      productWebsite: "",
      codename: "",
      punchline: "",
      description: "",
      images: [],
      logo_src: "",
      categories: "",
      ...(state?.fields ?? {}),
    },
  })

  const { isValid } = form.formState

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name')

      if (error) {
        console.error('Error fetching categories:', error)
      } else {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (state.message) {
      if (state.issues.length < 1) {
        toast.success(state.message);
      } else {
        toast.error(state.issues.join(", "));
      }
    }
    setLoading(false);
  }, [state.message, state.issues]);

  return (
    <Form {...form}>
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={formRef}
        className="space-y-8"
        action={formAction}
        onSubmit={async (evt) => {
          evt.preventDefault();
          const result = await form.trigger();
          if (!result) {
            const errors = form.formState.errors;
            const errorMessages = Object.entries(errors)
              .map(([field, error]) => `${field}: ${error.message}`)
              .join(', ');
            toast.error(`Please correct the following errors: ${errorMessages}`);
            return;
          }
          setLoading(true);
          toast.promise(p, { loading: "Submitting..." });
          try {
            let formData = new FormData(formRef.current!);
            const logoFile = form.getValues("images");
            if (logoFile.length > 0) {
              formData.set("images", logoFile[0]);
            }
            await formAction(formData);
            router.push("/");
          } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred while submitting the form. Please try again.");
          } finally {
            setLoading(false);
          }
        }}
      >
        <GradientHeading size="xs">
          Let's start with your personal deets
        </GradientHeading>
        <div className="flex flex-wrap gap-1 md:gap-2">
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
            name="productWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course website</FormLabel>
                <FormControl>
                  <Input placeholder="Your course url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <GradientHeading size="xs">
          Tell us more about your course
        </GradientHeading>
        <FormField
          control={form.control}
          name="codename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Course name</FormLabel>
              <FormControl>
                <Input placeholder="Your course's codename" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="punchline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your course's punchline (&lt;10 words)</FormLabel>
              <FormControl>
                <Input placeholder="Your course's punchline" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>A short description here (~70 words)</FormLabel>
              <FormControl>
                <Input placeholder="A short description here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Logo file (.jpg or .png format, 128x128)</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This is the category that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <StyledButton disabled={loading} type="submit">
          {loading ? "Submitting..." : "Submit"}
        </StyledButton>
      </form>
    </Form>
  )
}

export default SubmitTool