import { z } from "zod"

export const schema = z.object({
  fullName: z.string().trim().min(1, { message: "Full name is required." }),
  email: z.string().trim().email({ message: "Invalid email address." }),
  productWebsite: z.string().trim().url({ message: "Invalid URL." }),
  codename: z.string().trim().min(1, { message: "Codename is required." }),
  punchline: z
    .string()
    .trim()
    .max(30, { message: "Punchline must be 30 characters or less." }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required." })
    .max(280, { message: "Description must be 280 characters or less." }),
  categories: z.string().uuid({ message: "Please select a valid existing category." }),
  images: z.any(),
  logo_src: z.any().optional(),
})

export const enrichmentSchema = z.object({
  tags: z
    .array(z.string())
    .min(1, { message: "At least one tag is required." }),
  labels: z
    .array(z.string())
    .min(1, { message: "At least one label is required." }),
})
