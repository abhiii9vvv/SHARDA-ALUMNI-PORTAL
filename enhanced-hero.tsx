"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Briefcase, Calendar, ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"

interface EnhancedHeroProps {
  onNavigate: (page: string) => void
  onShowVideo: () => void
}

export default function EnhancedHero({ onNavigate, onShowVideo }: EnhancedHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/campus-hero.jpg" alt="Sharda University Campus" fill className="object-cover" priority />
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-gray-900/90" />

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <Badge className="mb-6 bg-blue-600/30 text-blue-200 border-blue-400/30 hover:bg-blue-600/40 backdrop-blur-sm">
          <Users className="w-4 h-4 mr-2" />
          50,000+ Alumni Worldwide
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
          Connect. Network.
          <span className="block text-blue-300 mt-2">Grow Together.</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join the global Sharda University alumni community. Discover opportunities, share experiences, and build
          lasting professional relationships that propel your career forward.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={() => onNavigate("signup")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Join Alumni Network
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onShowVideo}
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Our Story
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 shadow-lg border border-white/10">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-300 mr-2" />
              <span className="text-2xl font-bold">50K+</span>
            </div>
            <p className="text-gray-300 text-sm">Global Alumni</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 shadow-lg border border-white/10">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="w-6 h-6 text-blue-300 mr-2" />
              <span className="text-2xl font-bold">250+</span>
            </div>
            <p className="text-gray-300 text-sm">Job Opportunities</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 shadow-lg border border-white/10">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-blue-300 mr-2" />
              <span className="text-2xl font-bold">100+</span>
            </div>
            <p className="text-gray-300 text-sm">Annual Events</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white flex flex-col items-center gap-2">
          <span className="text-xs">Explore More</span>
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}
