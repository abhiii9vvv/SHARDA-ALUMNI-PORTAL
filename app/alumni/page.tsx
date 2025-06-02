// ... remove the line: import SuccessStories from "@/success-stories"
// ... remove the line: <SuccessStories onStoryAction={() => {}} />
// ... optionally add a comment or placeholder for future alumni features

import { Button } from "@/components/ui/button"
import { Users, Award, Globe } from "lucide-react"
import ClientAlumniActions from "./ClientAlumniActions"

export const metadata = {
  title: "Alumni | Sharda University Alumni Portal",
  description: "Explore the Sharda University alumni network. Connect with fellow graduates, join chapters, and discover success stories.",
};

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Alumni Network</h1>
        
        {/* Add alumni statistics */}
        <div className="grid grid-cols-4 gap-6 mb-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">50,000+</h3>
            <p className="text-gray-600">Global Alumni</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">30+</h3>
            <p className="text-gray-600">Countries</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">25+</h3>
            <p className="text-gray-600">Regional Chapters</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">100+</h3>
            <p className="text-gray-600">Success Stories</p>
          </div>
        </div>

        {/* Add featured alumni section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Alumni</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <img src="/images/alumni-vikram.jpg" alt="Vikram Shah" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">Vikram Shah</h3>
              <p className="text-gray-600 text-center mb-2">Class of 2015</p>
              <p className="text-gray-600 text-center">CEO, Tech Innovations</p>
            </div>
            {/* Add more featured alumni cards */}
          </div>
        </div>

        {/* Add alumni benefits section */}
        <div className="mb-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Alumni Benefits</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Networking Opportunities</h3>
                <p className="text-gray-600">Connect with fellow alumni through events and our online directory.</p>
              </div>
            </div>
            {/* Add more benefit items */}
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-10 max-w-2xl">Welcome to the vibrant Sharda University alumni community! Connect, collaborate, and celebrate achievements with fellow graduates worldwide.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ClientAlumniActions />
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-blue-700 font-semibold mb-2">Not a member yet?</h3>
          <ClientAlumniActions ctaOnly />
        </div>
      </div>
    </div>
  )
}