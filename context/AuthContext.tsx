"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  profile: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any; data: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  error: string | null
  retry: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
        if (session?.user) {
          const { data: profileData, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single()
          if (profileError) throw profileError
          setProfile(profileData)
        }
        setLoading(false)
        setError(null)
      } catch (err: any) {
        setError("Failed to load user session. Please try again.")
        setLoading(false)
      }
    }
    getSession()
    timeoutId = setTimeout(() => {
      if (loading) {
        setError("Loading timed out. Please check your connection and try again.")
        setLoading(false)
      }
    }, 10000)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        const { data: profileData } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single()
        setProfile(profileData)
      } else {
        setProfile(null)
      }
      if (event === "SIGNED_IN") {
        router.push("/dashboard")
      } else if (event === "SIGNED_OUT") {
        router.push("/")
      }
      router.refresh()
    })
    return () => {
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
        emailRedirectTo: userData.options?.emailRedirectTo || undefined,
      },
    })
    return { error, data }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    if (typeof window !== 'undefined') {
      document.cookie = 'sb-access-token=; Max-Age=0; path=/;'
      document.cookie = 'sb-refresh-token=; Max-Age=0; path=/;'
      localStorage.removeItem('sb-access-token')
      localStorage.removeItem('sb-refresh-token')
      window.location.replace('/auth/login')
    }
  }

  const resetPassword = async (email: string) => {
    let redirectTo: string | undefined = undefined
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
    } else if (typeof window !== 'undefined') {
      redirectTo = `${window.location.origin}/auth/reset-password`
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })
    return { error }
  }

  const retry = () => {
    setLoading(true)
    setError(null)
    setUser(null)
    setProfile(null)
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    error,
    retry,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
