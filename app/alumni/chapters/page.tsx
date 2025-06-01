import { Users, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const chapters = [
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