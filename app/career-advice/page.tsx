import { Button } from "@/components/ui/button";
import { Lightbulb, BookOpen, Users } from "lucide-react";

export default function CareerAdvicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-yellow-500" /> Career Advice
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Get ahead in your career with expert advice, alumni stories, and practical resources. Whether you're a student, recent graduate, or seasoned professional, find guidance for every stage of your journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="rounded-xl shadow-lg p-6 border border-yellow-100 bg-white flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-yellow-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Articles & Guides</h2>
            <p className="text-gray-600 mb-4 text-center">Explore curated articles on job search, interviews, networking, and more.</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-yellow-100 bg-white flex flex-col items-center">
            <Users className="w-10 h-10 text-yellow-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Alumni Tips</h2>
            <p className="text-gray-600 mb-4 text-center">Read real-world advice and success stories from Sharda University alumni.</p>
          </div>
          <div className="rounded-xl shadow-lg p-6 border border-yellow-100 bg-white flex flex-col items-center">
            <Lightbulb className="w-10 h-10 text-yellow-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2">Ask an Expert</h2>
            <p className="text-gray-600 mb-4 text-center">Submit your questions and get personalized advice from career coaches and mentors.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl text-yellow-700 font-semibold mb-2">Ready to take the next step?</h3>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg font-semibold">Get Career Advice</Button>
        </div>
      </div>
    </div>
  );
} 