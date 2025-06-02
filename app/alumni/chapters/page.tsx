import { useState, useEffect } from "react";
import { Users, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AlumniChaptersPage() {
  type Chapter = {
    id: number;
    name: string;
    region: string;
    leader: { name: string; email: string };
    members: number;
    description: string;
  };

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = (await import("@/lib/supabase/client")).getSupabaseClient();
        const { data, error } = await supabase
          .from("alumni_chapters")
          .select("id, name, region, leader_name, leader_email, members, description")
          .order("name", { ascending: true });
        if (error) {
          setError("Failed to load chapters.");
        } else {
          setChapters(
            (data || []).map((c: any) => ({
              id: c.id,
              name: c.name,
              region: c.region,
              leader: { name: c.leader_name || "Unknown", email: c.leader_email || "" },
              members: c.members,
              description: c.description,
            }))
          );
        }
      } catch (err) {
        setError("Failed to load chapters.");
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Alumni Chapters</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Connect with alumni chapters across the globe. Join your local chapter to network, attend events, and stay connected with the Sharda community.
        </p>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            <span className="text-gray-400">Loading chapters...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
            <span className="text-red-400">{error}</span>
          </div>
        ) : chapters.length === 0 ? (
          <div className="text-center text-gray-500">No alumni chapters found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-white/90 rounded-lg shadow p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Users className="w-5 h-5" /> {chapter.name}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" /> {chapter.region}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <User className="w-4 h-4" /> {chapter.leader.name} {chapter.leader.email && (<span className="ml-1">(&lt;{chapter.leader.email}&gt;)</span>)}
                </div>
                <div className="text-gray-700 text-sm">{chapter.description}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">Members:</span>
                  <span className="font-medium text-gray-800">{chapter.members}</span>
                </div>
                <Button variant="outline" className="mt-4 self-start">Join Chapter</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

  {
    name: "Delhi NCR Chapter",
    region: "Delhi NCR, India",
    leader: { name: "Priya Sharma", email: "priya.sharma@email.com" },
    members: 320,
    description: "Connect with alumni in the Delhi NCR region for networking, events, and professional growth.",
  },
  {
    name: "Mumbai Chapter",
    region: "Mumbai, India",
    leader: { name: "Rahul Mehta", email: "rahul.mehta@email.com" },
    members: 210,
    description: "Join the vibrant Mumbai alumni community for meetups, career opportunities, and more.",
  },
  {
    name: "Bangalore Chapter",
    region: "Bangalore, India",
    leader: { name: "Anjali Rao", email: "anjali.rao@email.com" },
    members: 180,
    description: "Tech-focused alumni in Bangalore connect for innovation, mentorship, and events.",
  },
  {
    name: "International Chapter",
    region: "Global",
    leader: { name: "Amit Patel", email: "amit.patel@email.com" },
    members: 95,
    description: "For alumni living and working outside India. Stay connected globally!",
  },
];

export default function AlumniChaptersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-600" /> Alumni Chapters
        </h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl">
          Join a regional or international alumni chapter to connect with fellow graduates in your area, attend exclusive events, and grow your professional network.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((chapter) => (
            <div key={chapter.name} className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-blue-700 mb-1 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" /> {chapter.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2">{chapter.region}</p>
                <p className="text-gray-600 mb-4">{chapter.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 font-medium">Leader: {chapter.leader.name}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">Contact: {chapter.leader.email}</div>
                <div className="text-xs text-blue-600 font-semibold mb-2">{chapter.members} members</div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4">Join Chapter</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 