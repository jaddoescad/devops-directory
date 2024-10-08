import { z } from "zod"

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

export const schema = z.object({
  fullName: z.string().trim().min(1, { message: "Full name is required." }),
  email: z.string().trim().email({ message: "Invalid email address." }),
  courseUrl: z.string().trim().refine(
    (value) => urlRegex.test(value),
    {
      message: "Please enter a valid URL. It should start with http:// or https://",
    }
  ),
})

// Remove the enrichmentSchema if it's no longer needed
