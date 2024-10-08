"use server"

import "server-only"
import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from "@/db/supabase/server"

import { schema } from "./schema"

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues: string[]
}

// Helper function to check if an error has a message
function isErrorWithMessage(error: unknown): error is Error {
  return typeof error === "object" && error !== null && "message" in error
}

// Main function to handle the form submission
export async function onSubmitToolAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const db = createClient()
  const data = Object.fromEntries(formData.entries())
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    console.error("Form validation failed")
    const fields: Record<string, string> = {}
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString()
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    }
  }

  try {
    const submissionData = {
      name: parsed.data.fullName,
      email: parsed.data.email,
      course_url: parsed.data.courseUrl,
    }

    console.log("Inserting submission data")
    const { error } = await db.from("submissions").insert([submissionData])

    if (error) {
      console.error(`Error inserting submission data: ${error.message}`)
      throw new Error(error.message)
    }

    revalidatePath("/")
    revalidateTag("course-submissions")

    console.log("Submission data successfully inserted")

    return { message: "Course submitted successfully", issues: [] }
  } catch (error) {
    console.error(
      `Submission failed: ${
        isErrorWithMessage(error) ? error.message : "Unknown error occurred"
      }`
    )
    return {
      message: `Submission failed: ${
        isErrorWithMessage(error) ? error.message : "Unknown error occurred"
      }`,
      issues: [
        isErrorWithMessage(error) ? error.message : "Unknown error occurred",
      ],
    }
  }
}
