import { Button } from "@/components/ui/button";
import { Users, Award, Lightbulb } from "lucide-react";

export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-orange-700 mb-6 flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-orange-500" /> Mentorship Program
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Empower the next generation of Sharda University alumni! Our mentorship program connects experienced professionals with students and young graduates for guidance, support, and career growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl shadow-lg p-6 border border-orange-100 bg-white flex flex-col items-center">
            <Users className="w-10 h-10 text-orange-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Become a Mentor</h2>
            <p className="text-gray-600 mb-4 text-center">Share your knowledge and experience. Help students and young alumni navigate their careers and life decisions.</p>
            <Button variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50">Sign Up as Mentor</Button>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-orange-100 bg-white flex flex-col items-center">
            <Award className="w-10 h-10 text-orange-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Find a Mentor</h2>
            <p className="text-gray-600 mb-4 text-center">Get guidance from experienced alumni in your field. Build your network and gain valuable insights for your future.</p>
            <Button variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50">Request a Mentor</Button>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-orange-700 font-semibold mb-2">Ready to join the mentorship journey?</h3>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-semibold">Get Started</Button>
        </div>
      </div>
    </div>
  );
} 