"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"

interface UpcomingEventsProps {
  onEventAction: (action: string, event?: any) => void
}

export default function UpcomingEvents({ onEventAction }: UpcomingEventsProps) {
  const events = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2024",
      date: "March 15, 2024",
      location: "Sharda University Campus",
      description:
        "Join us for our biggest alumni gathering of the year. Reconnect with classmates, enjoy cultural performances, and celebrate our shared memories.",
      image: "/images/alumni-reunion.jpg",
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      date: "April 8, 2024",
      location: "Virtual Event",
      description:
        "Explore the latest trends in technology with industry leaders and fellow alumni. Network with professionals from top tech companies.",
      image: "/images/tech-summit.jpg",
    },
    {
      id: 3,
      title: "Career Mentorship Workshop",
      date: "April 22, 2024",
      location: "Delhi NCR Chapter",
      description:
        "Connect with senior alumni for career guidance and mentorship opportunities. Perfect for recent graduates and career changers.",
      image: "/images/career-workshop.jpg",
    },
  ]

  return (
    <section className="bg-gray-900 py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay connected with your alumni community through our exciting events. From reunions to professional
            networking sessions, there's always something happening in the Sharda University alumni network.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">{event.title}</h3>

                <div className="flex items-center text-blue-400 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>

                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{event.description}</p>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  size="sm"
                  onClick={() => onEventAction("rsvp", event)}
                >
                  RSVP Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  size="sm"
                  onClick={() => onEventAction("learn-more", event)}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Events Link */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3"
            onClick={() => onEventAction("view-all")}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}
