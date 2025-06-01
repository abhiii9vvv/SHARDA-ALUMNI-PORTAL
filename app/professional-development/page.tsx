import { Button } from "@/components/ui/button";
import { Briefcase, BookOpen, Video, Users } from "lucide-react";

export default function ProfessionalDevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-green-700 mb-6 flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-green-500" /> Professional Development
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Advance your career with exclusive resources, workshops, and webinars designed for Sharda University alumni. Stay ahead in your field and unlock new opportunities for growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-xl shadow-lg p-6 border border-green-100 bg-white flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-green-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Learning Resources</h2>
            <p className="text-gray-600 mb-4 text-center">Access curated articles, e-books, and guides to boost your skills and knowledge.</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-green-100 bg-white flex flex-col items-center">
            <Video className="w-10 h-10 text-green-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Workshops & Webinars</h2>
            <p className="text-gray-600 mb-4 text-center">Join live and recorded sessions led by industry experts and alumni leaders.</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-green-100 bg-white flex flex-col items-center">
            <Users className="w-10 h-10 text-green-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Peer Networking</h2>
            <p className="text-gray-600 mb-4 text-center">Connect with fellow alumni for knowledge sharing, collaboration, and support.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-green-700 font-semibold mb-2">Ready to grow your career?</h3>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold">Explore Opportunities</Button>
        </div>
      </div>
    </div>
  );
} 