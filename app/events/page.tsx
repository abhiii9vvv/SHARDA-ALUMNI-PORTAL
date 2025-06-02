// ... optionally add a comment or placeholder for future events features

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

export const metadata = {
  title: "Events | Sharda University Alumni Portal",
  description: "Explore upcoming and past events for Sharda University alumni. Join reunions, professional meetups, and more!",
};

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees?: number;
  type?: string;
  category?: string;
  image?: string;
}


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("events")
          .select("id, title, event_date, location, description, attendees, type, category, image")
          .order("event_date", { ascending: true });
        if (error) {
          setError("Failed to load events.");
        } else {
          setEvents(
            (data || []).map((e: any) => ({
              ...e,
              date: e.event_date,
            }))
          );
        }
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Events</h1>
        
        {/* Add event filters with improved styling */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            variant="outline" 
            className="bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
          >
            All Events
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Networking
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Professional Development
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Social
          </Button>
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
          {loading ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              <span className="text-gray-400">Loading events...</span>
            </div>
          ) : error ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <Calendar className="h-12 w-12 text-gray-300 mb-3" />
              <span className="text-red-400">{error}</span>
            </div>
          ) : events.length > 0 ? (
            events.map((event, idx) => (
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
                  <Users className="w-4 h-4" /> {event.attendees ? `${event.attendees}+ attendees` : ""}
                </div>
                {event.type === 'upcoming' && (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">RSVP</Button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <Calendar className="h-12 w-12 text-gray-300 mb-3" />
              <span className="text-gray-400">No events found.</span>
            </div>
          )}
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-white font-semibold mb-2">Want to host or suggest an event?</h3>
          <Button variant="outline" className="border-blue-400 text-blue-200 hover:bg-blue-800/50 hover:text-white">Submit Your Event</Button>
        </div>
      </div>
    </div>
  )
}
