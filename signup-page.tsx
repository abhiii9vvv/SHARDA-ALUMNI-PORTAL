"use client"

import type React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useState } from "react"

interface SignupPageProps {
  onNavigate: (page: string) => void
}

export default function SignupPage({ onNavigate }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    graduationYear: "",
    degree: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup attempt:", formData)
    // For demo purposes, navigate back to home
    onNavigate("home")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const graduationYears = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())

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
        <Button variant="ghost" onClick={() => onNavigate("home")} className="text-white hover:text-blue-300 mb-6 p-0">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
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
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Join Our Community</CardTitle>
            <p className="text-gray-600">Create your alumni account</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-9 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-9 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="graduationYear" className="text-gray-700 font-medium text-sm">
                    Graduation Year
                  </Label>
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) => handleInputChange("graduationYear", value)}
                  >
                    <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {graduationYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-gray-700 font-medium text-sm">
                    Degree
                  </Label>
                  <Select value={formData.degree} onValueChange={(value) => handleInputChange("degree", value)}>
                    <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm">
                      <SelectValue placeholder="Degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="bba">BBA</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="mbbs">MBBS</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Fields */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-9 pr-9 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-9 pr-9 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </Button>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto text-xs">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="newsletter" className="text-xs text-gray-600">
                    Subscribe to alumni newsletter and updates
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!formData.agreeToTerms}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-10 font-semibold text-sm disabled:opacity-50"
              >
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => onNavigate("login")}
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold text-sm"
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
