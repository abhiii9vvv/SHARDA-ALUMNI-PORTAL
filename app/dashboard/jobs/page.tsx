"use client"

import React from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://your-supabase-url.supabase.co"
const supabaseKey = "your-supabase-key"
const supabase = createClient(supabaseUrl, supabaseKey)

const JobsPage = () => {
  // Function to fetch jobs from Supabase
  const fetchJobs = async () => {
    const { data, error } = await supabase.from("jobs").select("*")
    if (error) {
      console.error("Error fetching jobs:", error)
    } else {
      console.log("Jobs fetched successfully:", data)
    }
  }

  // Call fetchJobs on component mount
  React.useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div>
      <h1>Jobs</h1>
      {/* Render jobs here */}
    </div>
  )
}

export default JobsPage
