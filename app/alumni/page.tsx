// ... remove the line: import SuccessStories from "@/success-stories"
// ... remove the line: <SuccessStories onStoryAction={() => {}} />
// ... optionally add a comment or placeholder for future alumni features

import { Button } from "@/components/ui/button"
import { Users, Award, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export const metadata = {
  title: "Alumni | Sharda University Alumni Portal",
  description: "Explore the Sharda University alumni network. Connect with fellow graduates, join chapters, and discover success stories.",
};

export default function AlumniPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Alumni Network</h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl">Welcome to the vibrant Sharda University alumni community! Connect, collaborate, and celebrate achievements with fellow graduates worldwide.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-xl shadow-lg p-6 border border-blue-100 bg-white flex flex-col items-center">
            <Users className="w-10 h-10 text-blue-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Alumni Directory</h2>
            <p className="text-gray-600 mb-4 text-center">Find and connect with alumni by name, industry, or location.</p>
            <Button variant="outline" onClick={() => router.push("/alumni/directory")}>Explore Directory</Button>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-blue-100 bg-white flex flex-col items-center">
            <Globe className="w-10 h-10 text-blue-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Regional Chapters</h2>
            <p className="text-gray-600 mb-4 text-center">Join local alumni chapters and attend meetups in your city or region.</p>
            <Button variant="outline" onClick={() => router.push("/alumni/chapters")}>View Chapters</Button>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-blue-100 bg-white flex flex-col items-center">
            <Award className="w-10 h-10 text-blue-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Notable Alumni</h2>
            <p className="text-gray-600 mb-4 text-center">Read inspiring stories of alumni making a difference worldwide.</p>
            <Button variant="outline" onClick={() => router.push("/success-stories")}>Success Stories</Button>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-blue-700 font-semibold mb-2">Not a member yet?</h3>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold" onClick={() => router.push("/auth/register")}>Join the Alumni Network</Button>
        </div>
      </div>
    </div>
  )
} 