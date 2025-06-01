import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, Award } from "lucide-react";

export default function VolunteerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-pink-700 mb-6 flex items-center gap-2">
          <Heart className="w-8 h-8 text-pink-500" /> Volunteer Opportunities
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Make a difference in the Sharda University community! Volunteer your time, skills, or resources to support students, alumni, and social causes. Whether you want to mentor, organize events, or give back in other ways, there's a place for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-xl shadow-lg p-6 border border-pink-100 bg-white flex flex-col items-center">
            <Users className="w-10 h-10 text-pink-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Mentor Students</h2>
            <p className="text-gray-600 mb-4 text-center">Guide current students and young alumni as they navigate their careers and studies.</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-pink-100 bg-white flex flex-col items-center">
            <Globe className="w-10 h-10 text-pink-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Organize Events</h2>
            <p className="text-gray-600 mb-4 text-center">Help plan reunions, networking events, and community service projects in your region.</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-pink-100 bg-white flex flex-col items-center">
            <Award className="w-10 h-10 text-pink-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Support Scholarships</h2>
            <p className="text-gray-600 mb-4 text-center">Contribute to scholarships and initiatives that empower the next generation of Sharda students.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-pink-700 font-semibold mb-2">Ready to make an impact?</h3>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg font-semibold">Get Involved</Button>
        </div>
      </div>
    </div>
  );
} 