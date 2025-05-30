"use client"

import JobBoardSection from "@/job-board-section"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Job Opportunities</h1>
        <JobBoardSection onJobAction={() => {}} />
        {/* TODO: Add job search/filter functionality here */}
      </div>
    </div>
  )
}
