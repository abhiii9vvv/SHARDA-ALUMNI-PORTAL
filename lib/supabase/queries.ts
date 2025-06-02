import { createServerClient } from "@supabase/ssr"
// WARNING: This file is server-only. Do not import in client components or pages directory.
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )
}

// User queries
export async function getUserProfile(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) throw error
  return data
}

// Event queries
export async function getEvents(filters?: {
  upcoming?: boolean
  eventType?: string
  limit?: number
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("events")
    .select(`
      *,
      organizer:users!organizer_id(first_name, last_name, profile_image_url),
      registrations:event_registrations(count)
    `)
    .eq("is_approved", true)
    .order("event_date", { ascending: true })

  if (filters?.upcoming) {
    query = query.gte("event_date", new Date().toISOString())
  }

  if (filters?.eventType) {
    query = query.eq("event_type", filters.eventType)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function createEvent(eventData: any, userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("events")
    .insert({
      ...eventData,
      organizer_id: userId,
      is_approved: false, // Requires admin approval
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Job queries
export async function getJobs(filters?: {
  jobType?: string
  location?: string
  experienceLevel?: string
  limit?: number
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("jobs")
    .select(`
      *,
      poster:users!posted_by(first_name, last_name, company),
      applications:job_applications(count)
    `)
    .eq("is_active", true)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  if (filters?.jobType) {
    query = query.eq("job_type", filters.jobType)
  }

  if (filters?.location) {
    query = query.ilike("location", `%${filters.location}%`)
  }

  if (filters?.experienceLevel) {
    query = query.eq("experience_level", filters.experienceLevel)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function createJob(jobData: any, userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      ...jobData,
      posted_by: userId,
      is_approved: false, // Requires admin approval
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Success stories queries
export async function getSuccessStories(limit?: number) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("success_stories")
    .select(`
      *,
      user:users!user_id(first_name, last_name, profile_image_url, graduation_year)
    `)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

// Notification queries
export async function getUserNotifications(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) throw error
  return data
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId)

  if (error) throw error
}
