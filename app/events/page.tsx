"use client"

import UpcomingEvents from "@/upcoming-events"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Events</h1>
        <UpcomingEvents onEventAction={() => {}} />
      </div>
    </div>
  )
}
