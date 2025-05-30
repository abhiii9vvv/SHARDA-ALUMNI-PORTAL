"use client"

export const dynamic = "force-dynamic";

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { resetPassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await resetPassword(email)

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      setIsSubmitted(true)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset password email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/auth/login")}
          className="text-white hover:text-blue-300 mb-6 p-0"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>

        <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 mr-3">
                <Image
                  src="/images/sharda-logo.png"
                  alt="Sharda University Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sharda University</h1>
                <p className="text-xs text-blue-600">Alumni Connect</p>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Reset Password</CardTitle>
            <p className="text-gray-600">
              {isSubmitted
                ? "Check your email for a password reset link"
                : "Enter your email to receive a password reset link"}
            </p>
          </CardHeader>

          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
                  <p>
                    We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
                    instructions to reset your password.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">Didn't receive an email?</p>
                  <Button type="button" variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                    Try Again
                  </Button>
                </div>
                <div>
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12 font-semibold"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
