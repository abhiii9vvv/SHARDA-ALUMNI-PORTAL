"use client"

import { useState } from "react";
import JobBoardSection from "@/job-board-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Search } from "lucide-react";

const sampleJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Unilever",
    location: "Mumbai, India",
    type: "Full-time",
    posted: "5 days ago",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Infosys",
    location: "Hyderabad, India",
    type: "Remote",
    posted: "1 week ago",
  },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const filteredJobs = sampleJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-blue-600" /> Job Opportunities
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <Input
            type="text"
            placeholder="Search jobs, companies, or locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-96"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Search className="w-4 h-4" /> Search
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500" /> {job.type}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">{job.location}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">{job.posted}</span>
                  <Button variant="outline" className="border-blue-400 text-blue-600 hover:bg-blue-50">View Details</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-12">No jobs found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
