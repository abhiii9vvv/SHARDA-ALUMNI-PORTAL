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