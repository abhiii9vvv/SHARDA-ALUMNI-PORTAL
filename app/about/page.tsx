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
            <CardTitle as="h2" className="text-2xl font-bold text-gray-900">Sharda University Alumni Connect</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sharda University Alumni Connect is more than a portal—it's a vibrant, lifelong community for graduates of Sharda University. Our platform is designed to empower alumni to reach new heights, foster meaningful relationships, and create a positive impact in the world. Whether you are seeking mentorship, career opportunities, or a way to give back, we are here to support your journey every step of the way.
            </p>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-start gap-3 text-left justify-center">
                <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm" as="h3">Our Mission</h4>
                  <p className="text-xs text-gray-600">
                    To unite, support, and elevate Sharda University alumni by providing a dynamic platform for networking, mentorship, and lifelong learning. We strive to nurture a culture of collaboration, innovation, and mutual growth, empowering our graduates to become leaders and changemakers in their fields and communities.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left justify-center">
                <Users className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm" as="h3">Our Vision</h4>
                  <p className="text-xs text-gray-600">
                    To cultivate a globally connected alumni network that inspires excellence, drives innovation, and makes a lasting difference across industries and societies. We envision a future where every Sharda University graduate feels valued, engaged, and empowered to contribute to a better world.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Team Section */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle as="h2" className="text-2xl font-bold text-gray-900">Meet the Team</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Behind Sharda University Alumni Connect is a passionate team of educators, technologists, and alumni who believe in the power of community. Our team is dedicated to creating a welcoming space where graduates can connect, grow, and give back.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="bg-blue-50 rounded-lg p-4 shadow w-full md:w-1/3">
                <h4 className="font-semibold text-gray-900 mb-1" as="h3">Dr. Priya Sharma</h4>
                <p className="text-xs text-gray-600 mb-2">Director, Alumni Relations</p>
                <p className="text-xs text-gray-500">Dr. Sharma leads our alumni engagement initiatives, ensuring every graduate feels connected and supported.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 shadow w-full md:w-1/3">
                <h4 className="font-semibold text-gray-900 mb-1" as="h3">Rahul Mehta</h4>
                <p className="text-xs text-gray-600 mb-2">Lead Developer</p>
                <p className="text-xs text-gray-500">Rahul brings the portal to life with innovative technology and a user-first approach.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 shadow w-full md:w-1/3">
                <h4 className="font-semibold text-gray-900 mb-1" as="h3">Anjali Verma</h4>
                <p className="text-xs text-gray-600 mb-2">Community Manager</p>
                <p className="text-xs text-gray-500">Anjali fosters meaningful connections and ensures alumni voices are heard and celebrated.</p>
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

export const metadata = {
  title: "About Us | Sharda University Alumni Portal",
  description: "Learn about the mission, vision, and team behind the Sharda University Alumni Portal. Discover how we empower alumni and foster lifelong connections.",
}; 