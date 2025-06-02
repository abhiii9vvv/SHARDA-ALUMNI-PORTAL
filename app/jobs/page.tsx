"use client"

import { useState } from "react";
import JobBoardSection from "@/job-board-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Search } from "lucide-react";

import { useEffect } from "react";
// import { getJobs } from "@/lib/supabase/queries";
// TODO: Replace with client-side Supabase fetch or move logic to server component.

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type?: string;
  created_at?: string;
}


export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = require('@/lib/supabase/client').getSupabaseClient();
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) {
          setError('Failed to load jobs.');
          setJobs([]);
        } else {
          setJobs(data || []);
        }
      } catch (err: any) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      (job.location?.toLowerCase().includes(search.toLowerCase()) ?? false)
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2" type="button">
            <Search className="w-4 h-4" /> Search
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <svg
                className="animate-spin h-8 w-8 text-blue-500 mb-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              <span className="text-gray-400">Loading jobs...</span>
            </div>
          ) : error ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <svg
                className="h-12 w-12 text-gray-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              <span className="text-red-400">{error}</span>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500" /> {job.job_type}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">{job.location}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">
                    {job.created_at ? new Date(job.created_at).toLocaleDateString() : ""}
                  </span>
                  <Button variant="outline" className="border-blue-400 text-blue-600 hover:bg-blue-50">
                    View Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-12">
              No jobs found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
