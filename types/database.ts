export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          graduation_year: number | null
          degree: string | null
          bio: string | null
          company: string | null
          position: string | null
          location: string | null
          linkedin_url: string | null
          twitter_url: string | null
          website_url: string | null
          profile_image_url: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          graduation_year?: number | null
          degree?: string | null
          bio?: string | null
          company?: string | null
          position?: string | null
          location?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          profile_image_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          graduation_year?: number | null
          degree?: string | null
          bio?: string | null
          company?: string | null
          position?: string | null
          location?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          profile_image_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          location: string
          event_type: string
          max_attendees: number | null
          is_virtual: boolean
          meeting_link: string | null
          image_url: string | null
          organizer_id: string
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          location: string
          event_type: string
          max_attendees?: number | null
          is_virtual?: boolean
          meeting_link?: string | null
          image_url?: string | null
          organizer_id: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          location?: string
          event_type?: string
          max_attendees?: number | null
          is_virtual?: boolean
          meeting_link?: string | null
          image_url?: string | null
          organizer_id?: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          job_type: string
          experience_level: string
          salary_range: string | null
          description: string
          requirements: string
          application_link: string | null
          application_deadline: string | null
          posted_by: string
          is_active: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          job_type: string
          experience_level: string
          salary_range?: string | null
          description: string
          requirements: string
          application_link?: string | null
          application_deadline?: string | null
          posted_by: string
          is_active?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          job_type?: string
          experience_level?: string
          salary_range?: string | null
          description?: string
          requirements?: string
          application_link?: string | null
          application_deadline?: string | null
          posted_by?: string
          is_active?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      success_stories: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          company: string | null
          position: string | null
          image_url: string | null
          is_featured: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          company?: string | null
          position?: string | null
          image_url?: string | null
          is_featured?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          company?: string | null
          position?: string | null
          image_url?: string | null
          is_featured?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          link: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          link?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}
