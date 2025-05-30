"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Sharda University Alumni Connect</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sharda University Alumni Connect is dedicated to building a lifelong, global community. Our mission is to empower graduates to achieve their highest potential, foster meaningful connections, and inspire positive change in the world. We believe in the power of shared experiences, mentorship, and collaboration to drive personal and professional growth.
            </p>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-start gap-3 text-left justify-center">
                <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Our Mission</h4>
                  <p className="text-xs text-gray-600">To unite, support, and elevate alumni through opportunities, mentorship, and lifelong learning.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left justify-center">
                <Users className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Our Vision</h4>
                  <p className="text-xs text-gray-600">A vibrant, engaged alumni network making a global impact across industries and communities.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sharda University Alumni Connect. All rights reserved.
        </div>
      </div>
    </div>
  )
} 