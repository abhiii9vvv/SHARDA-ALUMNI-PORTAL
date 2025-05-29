"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendingEmail, setIsResendingEmail] = useState(false)
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false)
  const { signIn, user, loading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const supabase = createClientComponentClient()

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push(callbackUrl)
    }
  }, [user, loading, router, callbackUrl])

  const handleResendConfirmation = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsResendingEmail(true)

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to resend confirmation email",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Confirmation email sent. Please check your inbox.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsResendingEmail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setEmailNotConfirmed(false)

    try {
      console.log("Attempting to sign in with:", email)
      const { error } = await signIn(email, password)

      if (error) {
        console.error("Login error:", error)

        // Check if the error is due to email not being confirmed
        if (error.message?.includes("Email not confirmed")) {
          setEmailNotConfirmed(true)
        } else {
          toast({
            title: "Login Failed",
            description: error.message || "Invalid email or password",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Success!",
          description: "Welcome back!",
        })
        // The redirect will be handled by the AuthContext
      }
    } catch (error) {
      console.error("Login exception:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Don't render login form if user is already authenticated
  if (user) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Sharda Alumni account</CardDescription>
        </CardHeader>
        <CardContent>
          {emailNotConfirmed && (
            <Alert className="mb-6 border-amber-500 bg-amber-50">
              <AlertTitle>Email not confirmed</AlertTitle>
              <AlertDescription>
                Please check your inbox and confirm your email address before signing in.
                <Button
                  variant="link"
                  onClick={handleResendConfirmation}
                  disabled={isResendingEmail}
                  className="p-0 text-amber-600 hover:text-amber-800"
                >
                  {isResendingEmail ? "Sending..." : "Resend confirmation email"}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
