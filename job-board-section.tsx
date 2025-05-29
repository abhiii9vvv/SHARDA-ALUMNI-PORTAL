"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Heart, Quote, Search, Users, Target } from "lucide-react"

interface JobBoardSectionProps {
  onJobAction: (action: string, job?: any) => void
}

export default function JobBoardSection({ onJobAction }: JobBoardSectionProps) {
  const testimonials = [
    {
      quote: "The alumni network helped me land my dream job at Microsoft. The connections are invaluable!",
      author: "Rahul Gupta",
      position: "Software Engineer, Microsoft",
      year: "2020",
    },
    {
      quote: "Through the job board, I found amazing opportunities that perfectly matched my skills and aspirations.",
      author: "Sneha Patel",
      position: "Data Scientist, Amazon",
      year: "2019",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Alumni Job Board</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with opportunities, grow your network, and advance your career through our comprehensive alumni
            platform designed for Sharda University graduates.
          </p>
        </div>

        {/* Three Information Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Explore Box */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Explore</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover the latest job opportunities posted exclusively for Sharda University alumni. From entry-level
                positions to executive roles across various industries.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Active Jobs</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">250+</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Companies</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">150+</span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => onJobAction("browse")}>
                Browse Jobs
              </Button>
            </CardContent>
          </Card>

          {/* About Box */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">About</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6 leading-relaxed">
                The Sharda University Alumni Association is dedicated to fostering lifelong connections, supporting
                career growth, and creating opportunities for our global community of graduates.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-left">
                  <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Our Mission</h4>
                    <p className="text-xs text-gray-600">Empowering alumni through networking and career advancement</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <Users className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Global Network</h4>
                    <p className="text-xs text-gray-600">50,000+ alumni across 80+ countries worldwide</p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => alert("Learn more about our mission!")}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>

          {/* Testimonials Box */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-purple-200 pl-4">
                    <p className="text-gray-600 text-sm italic mb-3 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="text-xs">
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-purple-600">{testimonial.position}</p>
                      <p className="text-gray-500">Class of {testimonial.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => alert("Read more success stories!")}
              >
                Read More Stories
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to advance your career?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of Sharda University alumni who have found their dream jobs through our exclusive network.
            Post your resume, connect with recruiters, and discover opportunities tailored for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => onJobAction("create-profile")}
            >
              Create Profile
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
              onClick={() => onJobAction("post-job")}
            >
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
