"use client"

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, Briefcase, Bell, Award, MapPin, Clock, ExternalLink, Plus } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { FadeIn } from "@/components/ui/fade-in"
import { AnimatedCard } from "@/components/ui/animated-card"
import Navigation from "@/components/navigation"
import User from "lucide-react/dist/esm/icons/user" // Import User icon

interface DashboardStats {
  upcomingEvents: number
  myEvents: number
  jobApplications: number
  notifications: number
  connections: number
}

interface RecentActivity {
  events: any[]
  jobs: any[]
  notifications: any[]
}

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    upcomingEvents: 0,
    myEvents: 0,
    jobApplications: 0,
    notifications: 0,
    connections: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity>({
    events: [],
    jobs: [],
    notifications: [],
  })
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    if (!user?.id) return

    try {
      // Fetch user's registered events
      const { data: registeredEvents } = await supabase
        .from("event_registrations")
        .select(`
          event:events(*)
        `)
        .eq("user_id", user.id)

      // Fetch user's created events
      const { data: myEvents } = await supabase.from("events").select("*").eq("organizer_id", user.id)

      // Fetch user's job applications
      const { data: jobApplications } = await supabase
        .from("job_applications")
        .select(`
          *,
          job:jobs(title, company)
        `)
        .eq("user_id", user.id)
        .order("applied_at", { ascending: false })
        .limit(5)

      // Fetch user's notifications
      const { data: notifications } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      // Fetch recent jobs
      const { data: recentJobs } = await supabase
        .from("jobs")
        .select(`
          *,
          poster:users!posted_by(first_name, last_name, company)
        `)
        .eq("is_active", true)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(3)

      // Calculate upcoming events
      const upcomingEvents = registeredEvents?.filter((reg) => new Date(reg.event.event_date) > new Date()) || []

      // Update stats
      setStats({
        upcomingEvents: upcomingEvents.length,
        myEvents: myEvents?.length || 0,
        jobApplications: jobApplications?.length || 0,
        notifications: notifications?.filter((n) => !n.is_read).length || 0,
        connections: Math.floor(Math.random() * 50) + 10, // Placeholder
      })

      // Update recent activity
      setRecentActivity({
        events: upcomingEvents.slice(0, 3).map((reg) => reg.event),
        jobs: recentJobs || [],
        notifications: notifications || [],
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    }
  }

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

      // Update local state
      setRecentActivity((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n)),
      }))

      setStats((prev) => ({
        ...prev,
        notifications: Math.max(0, prev.notifications - 1),
      }))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div className="h-8 w-8 animate-spin">
          <Calendar className="h-8 w-8" />
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Please log in to access the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.first_name || user.email}! 👋</h1>
                    <p className="text-blue-100 text-lg">
                      Stay connected with your alumni network and explore new opportunities.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Avatar className="h-20 w-20 border-4 border-white/20">
                      <AvatarImage src={profile?.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email || user?.id}`} />
                      <AvatarFallback className="bg-blue-500 text-white text-2xl">
                        {profile?.first_name?.charAt(0) || user.email.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Stats Cards */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <AnimatedCard delay={0.1}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Profile</p>
                      <h3 className="text-3xl font-bold text-gray-900">Complete</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Upcoming Events</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">My Events</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.myEvents}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Job Applications</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.jobApplications}</h3>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Briefcase className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Notifications</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.notifications}</h3>
                    </div>
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Bell className="h-6 w-6 text-pink-600" />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.6}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Connections</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stats.connections}</h3>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </FadeIn>

          {/* Recent Activity Section */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Events */}
              <AnimatedCard delay={0.1}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Upcoming Events
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/events">
                        View All
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>Events you're registered for</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentActivity.events.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.events.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => window.open(`/events/${event.id}`, "_blank")}
                        >
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(event.event_date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.event_type}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm mb-3">No upcoming events</p>
                      <Button size="sm" asChild>
                        <Link href="/events">
                          <Plus className="h-3 w-3 mr-1" />
                          Browse Events
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>

              {/* Recent Jobs */}
              <AnimatedCard delay={0.2}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Briefcase className="h-5 w-5 mr-2 text-green-600" />
                      Recent Jobs
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/jobs">
                        View All
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription>Latest job opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentActivity.jobs.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.jobs.map((job) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => window.open(`/jobs/${job.id}`, "_blank")}
                        >
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Briefcase className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{job.title}</h4>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge variant="outline" className="text-xs mb-1">
                              {job.job_type}
                            </Badge>
                            <span className="text-xs text-gray-400">{getTimeAgo(job.created_at)}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm mb-3">No recent jobs</p>
                      <Button size="sm" asChild>
                        <Link href="/jobs">
                          <Plus className="h-3 w-3 mr-1" />
                          Browse Jobs
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>

              {/* Notifications */}
              <AnimatedCard delay={0.3}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Bell className="h-5 w-5 mr-2 text-orange-600" />
                      Notifications
                      {stats.notifications > 0 && (
                        <Badge className="ml-2 bg-red-500 text-white text-xs">{stats.notifications}</Badge>
                      )}
                    </CardTitle>
                  </div>
                  <CardDescription>Recent activity updates</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentActivity.notifications.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                            notification.is_read ? "bg-gray-50" : "bg-blue-50 hover:bg-blue-100"
                          }`}
                          onClick={() => {
                            if (!notification.is_read) {
                              markNotificationAsRead(notification.id)
                            }
                            if (notification.link) {
                              window.open(notification.link, "_blank")
                            }
                          }}
                        >
                          <div className={`p-2 rounded-lg ${notification.is_read ? "bg-gray-200" : "bg-orange-100"}`}>
                            <Bell className={`h-4 w-4 ${notification.is_read ? "text-gray-500" : "text-orange-600"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-semibold truncate ${
                                notification.is_read ? "text-gray-600" : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <p
                              className={`text-sm truncate ${notification.is_read ? "text-gray-500" : "text-gray-700"}`}
                            >
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-400">{getTimeAgo(notification.created_at)}</span>
                          </div>
                          {!notification.is_read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No notifications</p>
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>
            </div>
          </FadeIn>

          {/* Quick Actions */}
          <FadeIn delay={0.6}>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnimatedCard delay={0.1}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Create Event</h3>
                    <p className="text-sm text-gray-600 mb-4">Organize a new alumni event</p>
                    <Button asChild className="w-full">
                      <Link href="/events">Get Started</Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.2}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                      <Briefcase className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Post Job</h3>
                    <p className="text-sm text-gray-600 mb-4">Share job opportunities</p>
                    <Button asChild className="w-full">
                      <Link href="/jobs">Post Now</Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.3}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Share Story</h3>
                    <p className="text-sm text-gray-600 mb-4">Inspire others with your journey</p>
                    <Button asChild className="w-full">
                      <Link href="/stories/create">Share Story</Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard delay={0.4}>
                  <CardContent className="p-6 text-center">
                    <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Find Alumni</h3>
                    <p className="text-sm text-gray-600 mb-4">Connect with fellow graduates</p>
                    <Button asChild className="w-full">
                      <Link href="/alumni">Explore</Link>
                    </Button>
                  </CardContent>
                </AnimatedCard>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
