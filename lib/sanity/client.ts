import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '6cndtg6y',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})