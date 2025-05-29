"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface PartnersSectionProps {
  onPartnerAction: (action: string, partner?: any) => void
}

export default function PartnersSection({ onPartnerAction }: PartnersSectionProps) {
  const partners = [
    {
      id: 1,
      name: "TechCorp Global",
      role: "Technology Partner",
      logo: "/images/partner-techcorp.png",
      description:
        "Providing cutting-edge technology solutions and internship opportunities for Sharda University students in software development and AI research.",
      category: "Technology",
    },
    {
      id: 2,
      name: "HealthPlus Hospitals",
      role: "Healthcare Partner",
      logo: "/images/partner-healthplus.png",
      description:
        "Collaborating on medical research and offering residency programs for medical graduates from Sharda University's renowned healthcare programs.",
      category: "Healthcare",
    },
    {
      id: 3,
      name: "Global Finance Group",
      role: "Financial Partner",
      logo: "/images/partner-finance.png",
      description:
        "Supporting business and finance students with scholarships, mentorship programs, and exclusive recruitment opportunities in banking and finance.",
      category: "Finance",
    },
    {
      id: 4,
      name: "EduBridge Foundation",
      role: "Education Partner",
      logo: "/images/partner-techcorp.png",
      description:
        "Working together to provide educational resources, exchange programs, and global learning opportunities for students across all disciplines.",
      category: "Education",
    },
    {
      id: 5,
      name: "InnoVentures",
      role: "Innovation Partner",
      logo: "/images/partner-healthplus.png",
      description:
        "Fostering entrepreneurship through startup incubation, innovation labs, and venture funding for promising ideas from Sharda University alumni.",
      category: "Innovation",
    },
    {
      id: 6,
      name: "MediaWorks International",
      role: "Media Partner",
      logo: "/images/partner-finance.png",
      description:
        "Offering media exposure, communication workshops, and internships in journalism, digital marketing, and public relations for creative students.",
      category: "Media",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Valued Partners</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sharda University collaborates with industry leaders to provide our students and alumni with exceptional
            opportunities for growth, innovation, and career advancement across diverse sectors.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <Card
              key={partner.id}
              className="border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="h-2 bg-blue-600"></div>
              <CardContent className="p-6 pt-8">
                <div className="flex flex-col h-full">
                  {/* Logo */}
                  <div className="h-16 mb-6 flex items-center justify-center bg-gray-50 rounded-md p-3">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      width={160}
                      height={64}
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded">
                      {partner.category}
                    </span>
                  </div>

                  {/* Partner Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4 text-sm">{partner.role}</p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{partner.description}</p>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  className="w-full bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-300 font-medium flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                  onClick={() => onPartnerAction("discover-more", partner)}
                >
                  Discover More
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Interested in becoming a partner?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Join our network of industry leaders and contribute to shaping the future of education and professional
              development.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              onClick={() => onPartnerAction("partner-with-us")}
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
