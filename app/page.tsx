"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4">
      <div className="max-w-2xl w-full text-center py-24">
        <div className="flex justify-center mb-8">
          <Image src="/images/sharda-logo.png" alt="Sharda University" width={96} height={96} className="h-24 w-auto" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sharda University Alumni Portal</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Connect, grow, and make a difference with the global Sharda alumni community. Discover events, job opportunities, and inspiring alumni stories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/alumni">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              Join Alumni Network
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm"
            onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
          >
            Watch Our Story
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link href="/events"><Button variant="ghost" className="text-blue-700 font-medium">Events</Button></Link>
          <Link href="/jobs"><Button variant="ghost" className="text-blue-700 font-medium">Jobs</Button></Link>
          <Link href="/alumni"><Button variant="ghost" className="text-blue-700 font-medium">Alumni</Button></Link>
          <Link href="/about"><Button variant="ghost" className="text-blue-700 font-medium">About</Button></Link>
        </div>
      </div>
    </div>
  )
}
