"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">404 - Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-sm text-gray-500">
        Made with ❤️ by Abhinav
      </div>
    </div>
  )
} 