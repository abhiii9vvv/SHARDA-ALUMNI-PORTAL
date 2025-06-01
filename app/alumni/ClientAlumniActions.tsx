"use client"

import { Button } from "@/components/ui/button"
import { Users, Award, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

interface ClientAlumniActionsProps {
  ctaOnly?: boolean;
}

export default function ClientAlumniActions({ ctaOnly }: ClientAlumniActionsProps) {
  const router = useRouter();

  if (ctaOnly) {
    return (
      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold" onClick={() => router.push("/auth/register")}>Join the Alumni Network</Button>
    );
  }

  return (
    <>
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
    </>
  );
} 