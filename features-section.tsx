"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, Calendar, Award, Globe, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FeaturesSection() {
  const router = useRouter();
  const features = [
    {
      icon: Users,
      title: "Alumni Directory",
      description: "Connect with fellow graduates across the globe. Search by industry, location, or graduation year.",
      color: "bg-blue-100 text-blue-600",
      action: () => router.push("/alumni/directory"),
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Access exclusive job postings and career advancement opportunities from our partner companies.",
      color: "bg-green-100 text-green-600",
      action: () => router.push("/jobs"),
    },
    {
      icon: Calendar,
      title: "Networking Events",
      description: "Attend reunions, professional meetups, and industry-specific networking events worldwide.",
      color: "bg-purple-100 text-purple-600",
      action: () => router.push("/events"),
    },
    {
      icon: Award,
      title: "Mentorship Program",
      description: "Give back by mentoring current students or get guidance from experienced professionals.",
      color: "bg-orange-100 text-orange-600",
      action: () => router.push("/mentorship"),
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join regional chapters and connect with alumni in your city or industry sector.",
      color: "bg-teal-100 text-teal-600",
      action: () => router.push("/alumni/chapters"),
    },
    {
      icon: Heart,
      title: "Give Back",
      description: "Support current students through scholarships, internships, and volunteer opportunities.",
      color: "bg-pink-100 text-pink-600",
      action: () => router.push("/volunteer"),
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Join Our Alumni Network?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the benefits of staying connected with your alma mater and fellow graduates through our
            comprehensive alumni platform.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-white cursor-pointer"
                onClick={feature.action}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {/* CTA */}
        <div className="text-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            onClick={() => router.push("/auth/register")}
          >
            Join Our Network
          </Button>
        </div>
      </div>
    </section>
  )
}
