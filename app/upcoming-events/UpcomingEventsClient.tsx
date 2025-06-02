"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function UpcomingEventsClient() {
  type Event = {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
    tag: string;
  };
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = (await import("@/lib/supabase/client")).getSupabaseClient();
        const { data, error } = await supabase
          .from("events")
          .select("id, title, date, location, description, image, tag")
          .order("date", { ascending: true });
        if (error) {
          setError("Failed to load events.");
        } else {
          setEvents(
            (data || []).map((e: any) => ({
              id: e.id,
              title: e.title,
              date: e.date,
              location: e.location,
              description: e.description,
              image: e.image || "/images/event-placeholder.png",
              tag: e.tag,
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
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Upcoming Events</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay up to date with all the latest alumni events, reunions, webinars, and more.
        </p>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            <span className="text-gray-400">Loading events...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
            <span className="text-red-400">{error}</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500">No upcoming events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white/90 rounded-lg shadow p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <span className="text-lg">{event.title}</span>
                  {event.tag && <span className="ml-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">{event.tag}</span>}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span className="mx-2">|</span>
                  <span>{event.location}</span>
                </div>
                <div className="text-gray-700 text-sm">{event.description}</div>
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded mt-2" />
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Register</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
                  <span className="text-sm">{event.location}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{event.description}</p>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  size="sm"
                  onClick={() => handleEventAction("rsvp", event)}
                >
                  RSVP Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  size="sm"
                  onClick={() => handleEventAction("learn-more", event)}
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
            onClick={() => handleEventAction("view-all")}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
} 