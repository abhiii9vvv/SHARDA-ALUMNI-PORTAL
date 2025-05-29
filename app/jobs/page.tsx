"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Briefcase, MapPin, Clock, DollarSign, Building, Plus, Search, Filter } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import Navigation from "@/components/navigation"
import type { Database } from "@/types/database"
import { useAuth } from "@/context/AuthContext"

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  job_type: z.string().min(1, "Please select job type"),
  experience_level: z.string().min(1, "Please select experience level"),
  salary_range: z.string().optional(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(20, "Requirements must be at least 20 characters"),
  application_deadline: z.string().optional(),
})

type JobFormData = z.infer<typeof jobSchema>

type JobWithApplications = Database["public"]["Tables"]["jobs"]["Row"] & {
  applications?: { count: number }[]
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobWithApplications[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobWithApplications[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { user, profile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      fetchJobs()
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      filterJobs()
    }
  }, [jobs, searchTerm, locationFilter, typeFilter, mounted])

  const fetchJobs = async () => {
    if (!mounted) return

    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          applications:job_applications(count)
        `)
        .eq("is_active", true)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })

      if (error) throw error

      const typedData = (data || []) as unknown as JobWithApplications[]
      setJobs(typedData)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast({
        title: "Error",
        description: "Failed to load jobs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    if (searchTerm) {
      filtered = filtered.filter(
        (job: JobWithApplications) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((job: JobWithApplications) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((job: JobWithApplications) => job.job_type === typeFilter)
    }

    setFilteredJobs(filtered)
  }

  const onSubmit = async (data: JobFormData) => {
    if (!mounted) return

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to post jobs",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("jobs").insert({
        title: data.title,
        company: data.company,
        location: data.location,
        job_type: data.job_type,
        experience_level: data.experience_level,
        salary_range: data.salary_range || null,
        description: data.description,
        requirements: data.requirements,
        application_deadline: data.application_deadline || null,
        posted_by: user.id,
        is_active: true,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Job posted successfully!",
      })

      setIsCreateDialogOpen(false)
      reset()
      fetchJobs()
    } catch (error) {
      console.error("Error creating job:", error)
      toast({
        title: "Error",
        description: "Failed to post job",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApply = async (jobId: string) => {
    if (!mounted) return

    if (!user) {
      router.push("/auth/login?callbackUrl=/jobs")
      return
    }

    try {
      const { error } = await supabase.from("job_applications").insert({
        job_id: jobId,
        user_id: user.id,
        application_status: "pending",
      })

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          toast({
            title: "Already Applied",
            description: "You've already applied for this job",
            variant: "destructive",
          })
        } else {
          throw error
        }
        return
      }

      toast({
        title: "Success",
        description: "Application submitted successfully!",
      })

      fetchJobs() // Refresh to update application counts
    } catch (error) {
      console.error("Error applying for job:", error)
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      })
    }
  }

  const getJobTypeColor = (type: string) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800",
      "part-time": "bg-blue-100 text-blue-800",
      contract: "bg-orange-100 text-orange-800",
      internship: "bg-purple-100 text-purple-800",
      freelance: "bg-pink-100 text-pink-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isDeadlineSoon = (deadline?: string) => {
    if (!deadline) return false
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni Job Board</h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Discover career opportunities shared by fellow alumni and industry partners. Find your next role or help
                others by posting job openings.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search jobs, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {user && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          {...register("title")}
                          id="title"
                          placeholder="e.g. Senior Software Engineer"
                          disabled={isSubmitting}
                        />
                        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          {...register("company")}
                          id="company"
                          placeholder="Company name"
                          disabled={isSubmitting}
                        />
                        {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          {...register("location")}
                          id="location"
                          placeholder="e.g. Mumbai, Remote"
                          disabled={isSubmitting}
                        />
                        {errors.location && <p className="text-sm text-red-600">{errors.location.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="job_type">Job Type</Label>
                        <Select onValueChange={(value) => setValue("job_type", value)} disabled={isSubmitting}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.job_type && <p className="text-sm text-red-600">{errors.job_type.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="experience_level">Experience Level</Label>
                        <Select onValueChange={(value) => setValue("experience_level", value)} disabled={isSubmitting}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="lead">Lead/Principal</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience_level && (
                          <p className="text-sm text-red-600">{errors.experience_level.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="salary_range">Salary Range (Optional)</Label>
                        <Input
                          {...register("salary_range")}
                          id="salary_range"
                          placeholder="e.g. ₹8-12 LPA"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <Label htmlFor="application_deadline">Application Deadline (Optional)</Label>
                        <Input
                          {...register("application_deadline")}
                          id="application_deadline"
                          type="date"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                          {...register("description")}
                          id="description"
                          placeholder="Describe the role, responsibilities, and company culture"
                          rows={4}
                          disabled={isSubmitting}
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          {...register("requirements")}
                          id="requirements"
                          placeholder="List required skills, qualifications, and experience"
                          rows={3}
                          disabled={isSubmitting}
                        />
                        {errors.requirements && <p className="text-sm text-red-600">{errors.requirements.message}</p>}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Posting..." : "Post Job"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || locationFilter !== "all" || typeFilter !== "all"
                    ? "No jobs match your search criteria"
                    : "There are no job postings at the moment"}
                </p>
                {user && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post the first job
                  </Button>
                )}
              </div>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{formatDate(job.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getJobTypeColor(job.job_type)}>{job.job_type}</Badge>
                          <Badge variant="outline">{job.experience_level}</Badge>
                          {job.salary_range && (
                            <Badge variant="outline">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {job.salary_range}
                            </Badge>
                          )}
                          {job.application_deadline && isDeadlineSoon(job.application_deadline) && (
                            <Badge variant="destructive">Deadline Soon</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">{job.description}</p>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Key Requirements:</h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{job.requirements}</p>
                    </div>

                    {job.application_deadline && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Application deadline: {formatDate(job.application_deadline)}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{job.applications?.[0]?.count || 0} applications</div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <a href={`/jobs/${job.id}`}>View Details</a>
                      </Button>
                      <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
