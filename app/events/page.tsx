// ... optionally add a comment or placeholder for future events features

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export const metadata = {
  title: "Events | Sharda University Alumni Portal",
  description: "Explore upcoming and past events for Sharda University alumni. Join reunions, professional meetups, and more!",
};

const events = [
  {
    title: "Annual Alumni Meet 2024",
    date: "2024-09-15",
    location: "Sharda University Campus, Greater Noida",
    description: "Reconnect with your batchmates, network with professionals, and celebrate the spirit of Sharda!",
    attendees: 500,
    type: "upcoming",
    category: "Networking", // Add categories
    image: "/images/alumni-reunion.jpg", // Add event images
    agenda: [
      "9:00 AM - Registration",
      "10:00 AM - Welcome Address",
      "11:00 AM - Panel Discussion",
      "1:00 PM - Networking Lunch",
      "2:30 PM - Alumni Awards",
      "4:00 PM - Cultural Program"
    ],
    speakers: [
      { name: "Dr. Jane Smith", role: "CEO, Tech Innovations" },
      { name: "Mr. John Doe", role: "Founder, StartUp Hub" }
    ],
    registrationFee: "₹1000",
    contactPerson: "Alumni Relations Office",
    contactEmail: "alumni@sharda.ac.in"
  },
  {
    title: "Webinar: Career Growth in Tech",
    date: "2024-07-10",
    location: "Online",
    description: "Industry leaders share insights on career advancement in technology.",
    attendees: 200,
    type: "upcoming",
  },
  {
    title: "Alumni Sports Day 2023",
    date: "2023-12-05",
    location: "Sharda University Sports Complex",
    description: "A day of fun, games, and reconnecting with old friends.",
    attendees: 300,
    type: "past",
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Events</h1>
        
        {/* Add event filters */}
        <div className="flex gap-4 mb-8">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">All Events</Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">Networking</Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">Professional Development</Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">Social</Button>
        </div>
        
        {/* Add event statistics */}
        <div className="grid grid-cols-3 gap-6 mb-12 text-center">
          <div className="bg-gray-800/80 rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-2">15+</h3>
            <p className="text-gray-300">Upcoming Events</p>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
            <p className="text-gray-300">Alumni Attended</p>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-6">
            <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
            <p className="text-gray-300">Cities Covered</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, idx) => (
            <div key={idx} className={`rounded-xl shadow-lg p-6 border border-gray-800 bg-gray-800/80 ${event.type === 'upcoming' ? 'ring-2 ring-blue-500' : ''}`}>
              <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> {event.title}
              </h2>
              <div className="flex items-center gap-3 text-gray-300 text-sm mb-2">
                <MapPin className="w-4 h-4" /> {event.location}
              </div>
              <div className="text-gray-400 text-xs mb-2">{new Date(event.date).toLocaleDateString()}</div>
              <p className="text-gray-200 mb-4">{event.description}</p>
              <div className="flex items-center gap-2 text-blue-300 text-xs mb-4">
                <Users className="w-4 h-4" /> {event.attendees}+ attendees
              </div>
              {event.type === 'upcoming' && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">RSVP</Button>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-white font-semibold mb-2">Want to host or suggest an event?</h3>
          <Button variant="outline" className="border-blue-400 text-blue-200 hover:bg-blue-800/50 hover:text-white">Submit Your Event</Button>
        </div>
      </div>
    </div>
  )
}
