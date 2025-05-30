"use client"

import SuccessStories from "@/success-stories"

export default function AlumniPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Alumni</h1>
        {/* Success Stories Section */}
        <SuccessStories onStoryAction={() => {}} />
        {/* TODO: Add Alumni Directory and search/filter here */}
        <div className="mt-16 text-center text-gray-500">Alumni Directory coming soon...</div>
      </div>
    </div>
  )
} 