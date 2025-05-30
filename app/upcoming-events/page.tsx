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
      title: "Global Alumni Reunion 2025",
      date: "March 22, 2025",
      location: "Sharda University Campus, Greater Noida",
      description:
        "Celebrate our global alumni community! Enjoy a weekend of networking, cultural festivities, and keynote talks from distinguished alumni.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      tag: "Flagship",
    },
    {
      id: 2,
      title: "Women in Leadership Summit",
      date: "April 12, 2025",
      location: "Virtual Event",
      description:
        "Empowering women leaders across industries. Join panel discussions, workshops, and mentorship sessions led by accomplished alumnae.",
      image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=800&q=80",
      tag: "Leadership",
    },
    {
      id: 3,
      title: "Tech & Innovation Expo",
      date: "May 3, 2025",
      location: "Bangalore Chapter",
      description:
        "Showcase your startup, discover new technologies, and connect with tech innovators in the alumni network.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      tag: "Technology",
    },
    {
      id: 4,
      title: "Healthcare Heroes Meet",
      date: "June 14, 2025",
      location: "Delhi NCR Chapter",
      description:
        "A special event for alumni in healthcare. Share experiences, discuss innovations, and build collaborations for a healthier future.",
      image: "https://images.unsplash.com/photo-1519494080410-f9aa8f0dfb2c?auto=format&fit=crop&w=800&q=80",
      tag: "Healthcare",
    },
    {
      id: 5,
      title: "Entrepreneurship Bootcamp",
      date: "July 19, 2025",
      location: "Virtual Event",
      description:
        "Turn your ideas into reality! Intensive bootcamp for aspiring alumni entrepreneurs, featuring expert mentors and pitch sessions.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      tag: "Entrepreneurship",
    },
    {
      id: 6,
      title: "Annual Sports Fest",
      date: "August 23, 2025",
      location: "Sharda University Sports Complex",
      description:
        "Relive your campus days! Join alumni teams for cricket, football, and more. Family-friendly fun and prizes included.",
      image: "https://images.unsplash.com/photo-1505843279827-4b9b06c1b6c2?auto=format&fit=crop&w=800&q=80",
      tag: "Sports",
    },
  ]

  return (
    <section className="bg-gray-900 py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Upcoming Events</h1>
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
                    alt={`Event: ${event.title} at ${event.location}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {event.tag && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                      {event.tag}
                    </span>
                  )}
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

export const metadata = {
  title: "Upcoming Events | Sharda University Alumni Portal",
  description: "Stay updated with upcoming alumni events, reunions, and networking opportunities at Sharda University.",
}; 