import { useState, useEffect } from 'react'
import { createClient } from '@/db/supabase/client'

export function useUser() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user }
}