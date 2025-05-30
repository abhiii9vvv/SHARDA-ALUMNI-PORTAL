"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Heart, Quote, Search, Users, Target } from "lucide-react"
import { useRouter } from "next/navigation"

export default function JobBoardSection() {
  const router = useRouter();
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

  // Example jobs data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      link: "/jobs/1",
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Unilever",
      location: "Mumbai, India",
      link: "/jobs/2",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Infosys",
      location: "Hyderabad, India",
      link: "/jobs/3",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Job Board</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore exclusive job opportunities for Sharda University alumni.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{job.title}</CardTitle>
                  <p className="text-gray-500 text-sm">{job.company}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4">{job.location}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(job.link)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
