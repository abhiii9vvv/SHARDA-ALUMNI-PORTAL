"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Linkedin } from 'lucide-react'

// This is needed for static generation
export const dynamic = "force-dynamic"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, user, loading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const [showLongLoading, setShowLongLoading] = useState(false)

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      // Validate NEXT_PUBLIC_SITE_URL
      let baseUrl = '';
      if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')) {
        baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
      } else if (typeof window !== 'undefined') {
        baseUrl = window.location.origin;
      }
      if (!baseUrl) {
        throw new Error('Base URL for email redirect is not set. Please set NEXT_PUBLIC_SITE_URL in your environment variables.');
      }
      const redirectUrl = `${baseUrl}/auth/callback`;
      const { error } = await signUp(email, password, { 
        firstName, 
        lastName,
        options: {
          emailRedirectTo: redirectUrl
        }
      })
      if (error) {
        setError(error.message || "Registration failed")
        return
      }
      router.push('/auth/verify-email')
    } catch (error: any) {
      setError(error.message || "Registration error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join the Sharda Alumni community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Enter first name"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Enter last name"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
                disabled={isLoading}
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </form>
          <div className="flex flex-col gap-4 mt-8">
            <Button
              type="button"
              className="bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center gap-2"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({ provider: 'linkedin_oidc' })
              }}
            >
              <Linkedin className="w-5 h-5" /> Sign up with LinkedIn
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-sm text-gray-500">
        Made with ❤️ by Abhinav
      </div>
    </div>
  )
}
