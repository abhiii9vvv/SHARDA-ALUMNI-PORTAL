"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, MapPin, Users, Clock, Filter, Plus, Search, Star, ExternalLink } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import Navigation from "@/components/navigation"
import Image from "next/image"

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  event_date: z.string().min(1, "Please select a date"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  event_type: z.string().min(1, "Please select event type"),
  max_attendees: z.string().optional(),
  is_virtual: z.boolean().optional(),
  meeting_link: z.string().url().optional().or(z.literal("")),
})

type EventFormData = z.infer<typeof eventSchema>

interface Event {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  event_type: string
  max_attendees?: number
  is_virtual: boolean
  meeting_link?: string
  image_url?: string
  organizer_id: string
  is_approved: boolean
  created_at: string
  organizer?: {
    first_name: string
    last_name: string
    profile_image_url?: string
  }
  registrations?: { count: number }[]
  _count?: {
    registrations: number
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set())

  const { user } = useAuth()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      is_virtual: false,
    },
  })

  const isVirtual = watch("is_virtual")

  useEffect(() => {
    fetchEvents()
    if (user?.id) {
      fetchUserRegistrations()
    }
  }, [user])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, filterType])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select(`
          *,
          organizer:users!organizer_id(first_name, last_name, profile_image_url),
          _count:event_registrations(count)
        `)
        .eq("is_approved", true)
        .order("event_date", { ascending: true })

      if (error) throw error

      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUserRegistrations = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase.from("event_registrations").select("event_id").eq("user_id", user.id)

      if (error) throw error

      const registeredEventIds = new Set(data?.map((reg) => reg.event_id) || [])
      setRegisteredEvents(registeredEventIds)
    } catch (error) {
      console.error("Error fetching user registrations:", error)
    }
  }

  const filterEvents = () => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((event) => event.event_type === filterType)
    }

    setFilteredEvents(filtered)
  }

  const onSubmit = async (data: EventFormData) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create events",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("events").insert({
        title: data.title,
        description: data.description,
        event_date: data.event_date,
        location: data.location,
        event_type: data.event_type,
        max_attendees: data.max_attendees ? Number.parseInt(data.max_attendees) : null,
        is_virtual: data.is_virtual || false,
        meeting_link: data.meeting_link || null,
        organizer_id: user.id,
        is_approved: false, // Requires admin approval
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Event submitted for approval! You'll be notified once it's reviewed.",
      })

      setIsCreateDialogOpen(false)
      reset()
      fetchEvents()
    } catch (error) {
      console.error("Error creating event:", error)
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRSVP = async (eventId: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events",
        variant: "destructive",
      })
      return
    }

    try {
      if (registeredEvents.has(eventId)) {
        // Unregister
        const { error } = await supabase
          .from("event_registrations")
          .delete()
          .eq("event_id", eventId)
          .eq("user_id", user.id)

        if (error) throw error

        setRegisteredEvents((prev) => {
          const newSet = new Set(prev)
          newSet.delete(eventId)
          return newSet
        })

        toast({
          title: "Unregistered",
          description: "You've been unregistered from this event",
        })
      } else {
        // Register
        const { error } = await supabase.from("event_registrations").insert({
          event_id: eventId,
          user_id: user.id,
        })

        if (error) {
          if (error.code === "23505") {
            toast({
              title: "Already Registered",
              description: "You're already registered for this event",
              variant: "destructive",
            })
          } else {
            throw error
          }
          return
        }

        setRegisteredEvents((prev) => new Set([...prev, eventId]))

        toast({
          title: "Success",
          description: "Successfully registered for the event!",
        })
      }

      fetchEvents() // Refresh to update registration counts
    } catch (error) {
      console.error("Error with event registration:", error)
      toast({
        title: "Error",
        description: "Failed to update registration",
        variant: "destructive",
      })
    }
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      networking: "bg-blue-100 text-blue-800 border-blue-200",
      workshop: "bg-green-100 text-green-800 border-green-200",
      reunion: "bg-purple-100 text-purple-800 border-purple-200",
      seminar: "bg-orange-100 text-orange-800 border-orange-200",
      social: "bg-pink-100 text-pink-800 border-pink-200",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  const upcomingEvents = filteredEvents.filter((event) => isUpcoming(event.event_date))
  const pastEvents = filteredEvents.filter((event) => !isUpcoming(event.event_date))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navigation />
        <div className="pt-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="text-center">
                <Skeleton className="h-12 w-96 mx-auto mb-4 bg-blue-700" />
                <Skeleton className="h-6 w-[600px] mx-auto bg-blue-700" />
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Alumni Events
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-blue-100 max-w-3xl mx-auto"
              >
                Connect with fellow alumni through networking events, workshops, reunions, and more.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="reunion">Reunion</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {user && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Event</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Event Title
                        </Label>
                        <Input
                          {...register("title")}
                          id="title"
                          placeholder="Enter event title"
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          {...register("description")}
                          id="description"
                          placeholder="Describe your event"
                          rows={3}
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                        {errors.description && (
                          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="event_date" className="text-sm font-medium">
                          Date & Time
                        </Label>
                        <Input
                          {...register("event_date")}
                          id="event_date"
                          type="datetime-local"
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                        {errors.event_date && <p className="text-sm text-red-600 mt-1">{errors.event_date.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="event_type" className="text-sm font-medium">
                          Event Type
                        </Label>
                        <Select onValueChange={(value) => setValue("event_type", value)} disabled={isSubmitting}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="networking">Networking</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="reunion">Reunion</SelectItem>
                            <SelectItem value="seminar">Seminar</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.event_type && <p className="text-sm text-red-600 mt-1">{errors.event_type.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="location" className="text-sm font-medium">
                          Location
                        </Label>
                        <Input
                          {...register("location")}
                          id="location"
                          placeholder="Event location or 'Virtual'"
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                        {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="max_attendees" className="text-sm font-medium">
                          Max Attendees (Optional)
                        </Label>
                        <Input
                          {...register("max_attendees")}
                          id="max_attendees"
                          type="number"
                          placeholder="Leave empty for unlimited"
                          disabled={isSubmitting}
                          className="mt-1"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-2">
                          <input
                            {...register("is_virtual")}
                            id="is_virtual"
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            disabled={isSubmitting}
                          />
                          <Label htmlFor="is_virtual" className="text-sm font-medium">
                            This is a virtual event
                          </Label>
                        </div>
                      </div>

                      {isVirtual && (
                        <div className="md:col-span-2">
                          <Label htmlFor="meeting_link" className="text-sm font-medium">
                            Meeting Link
                          </Label>
                          <Input
                            {...register("meeting_link")}
                            id="meeting_link"
                            type="url"
                            placeholder="https://zoom.us/j/..."
                            disabled={isSubmitting}
                            className="mt-1"
                          />
                          {errors.meeting_link && (
                            <p className="text-sm text-red-600 mt-1">{errors.meeting_link.message}</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                        {isSubmitting ? "Creating..." : "Create Event"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Events Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Upcoming Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <AnimatePresence mode="wait">
                {upcomingEvents.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-16"
                  >
                    <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Calendar className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">No upcoming events</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {searchTerm || filterType !== "all"
                        ? "No events match your search criteria"
                        : "There are no upcoming events at the moment"}
                    </p>
                    {user && (
                      <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create the first event
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <CardHeader className="p-0">
                            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                              <Image
                                src={event.image_url || "/placeholder.svg?height=200&width=400"}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              <div className="absolute top-4 left-4">
                                <Badge className={`${getEventTypeColor(event.event_type)} border`}>
                                  {event.event_type}
                                </Badge>
                              </div>
                              {event.is_virtual && (
                                <div className="absolute top-4 right-4">
                                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                                    Virtual
                                  </Badge>
                                </div>
                              )}
                              {registeredEvents.has(event.id) && (
                                <div className="absolute bottom-4 right-4">
                                  <Badge className="bg-green-600 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Registered
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="p-6">
                            <CardTitle className="text-xl mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                              {event.title}
                            </CardTitle>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-gray-600">
                                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="text-sm font-medium">{formatDate(event.event_date)}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="w-4 h-4 mr-2 text-green-500" />
                                <span className="text-sm">
                                  {event._count?.registrations || 0} registered
                                  {event.max_attendees && ` / ${event.max_attendees}`}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{event.description}</p>

                            {event.organizer && (
                              <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={event.organizer.profile_image_url || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">
                                    {event.organizer.first_name[0]}
                                    {event.organizer.last_name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-500">
                                  Organized by {event.organizer.first_name} {event.organizer.last_name}
                                </span>
                              </div>
                            )}
                          </CardContent>

                          <CardFooter className="p-6 pt-0">
                            <div className="flex gap-2 w-full">
                              <Button
                                onClick={() => handleRSVP(event.id)}
                                className={`flex-1 transition-all duration-200 ${
                                  registeredEvents.has(event.id)
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                                disabled={
                                  event.max_attendees &&
                                  (event._count?.registrations || 0) >= event.max_attendees &&
                                  !registeredEvents.has(event.id)
                                }
                              >
                                {event.max_attendees &&
                                (event._count?.registrations || 0) >= event.max_attendees &&
                                !registeredEvents.has(event.id)
                                  ? "Event Full"
                                  : registeredEvents.has(event.id)
                                    ? "Unregister"
                                    : "RSVP"}
                              </Button>
                              <Button variant="outline" asChild className="border-gray-200 hover:border-blue-500">
                                <a href={`/events/${event.id}`}>
                                  Details
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="past">
              <AnimatePresence mode="wait">
                {pastEvents.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-16"
                  >
                    <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Clock className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">No past events</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {searchTerm || filterType !== "all"
                        ? "No past events match your search criteria"
                        : "No past events to display"}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {pastEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="opacity-75 hover:opacity-100 transition-opacity">
                          <CardHeader className="p-0">
                            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                              <Image
                                src={event.image_url || "/placeholder.svg?height=200&width=400"}
                                alt={event.title}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-4 left-4">
                                <Badge className={`${getEventTypeColor(event.event_type)} opacity-75`}>
                                  {event.event_type}
                                </Badge>
                              </div>
                              <div className="absolute top-4 right-4">
                                <Badge variant="secondary" className="bg-gray-800/80 text-white">
                                  Past Event
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="p-6">
                            <CardTitle className="text-xl mb-3 line-clamp-2 text-gray-700">{event.title}</CardTitle>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-gray-500">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="text-sm">{formatDate(event.event_date)}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Users className="w-4 h-4 mr-2" />
                                <span className="text-sm">{event._count?.registrations || 0} attended</span>
                              </div>
                            </div>

                            <p className="text-gray-500 text-sm line-clamp-3">{event.description}</p>
                          </CardContent>

                          <CardFooter className="p-6 pt-0">
                            <Button
                              variant="outline"
                              asChild
                              className="w-full border-gray-300 text-gray-600 hover:border-gray-400"
                            >
                              <a href={`/events/${event.id}`}>
                                View Details
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
