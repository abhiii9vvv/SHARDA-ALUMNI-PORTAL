"use client"

export const dynamic = "force-dynamic";

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

// This is needed for static generation
export const fetchCache = 'force-no-store'
export const revalidate = 0

interface Job {
  id: string
  title: string
  company: string
}

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Only fetch jobs on the client side
    if (typeof window !== 'undefined') {
      const supabase = getSupabaseClient()
      
      const fetchJobs = async () => {
        try {
          const { data, error } = await supabase.from("jobs").select("id, title, company")
          if (error) {
            console.error("Error fetching jobs:", error)
          } else {
            setJobs(data as Job[])
          }
        } catch (error) {
          console.error("Error:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchJobs()
    } else {
      // If we're rendering on the server (during static generation), just set loading to false
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Jobs Dashboard</CardTitle>
          <CardDescription>View and manage job listings</CardDescription>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No jobs found</p>
              <Button asChild>
                <Link href="/jobs" scroll={false}>View All Jobs</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/jobs/${job.id}`} scroll={false}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
