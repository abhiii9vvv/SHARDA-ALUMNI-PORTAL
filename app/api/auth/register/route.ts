import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { createAdminClient } from "@/lib/supabase/admin"

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  graduationYear: z.string(),
  degree: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Create a standard Supabase client for auth operations
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // Create admin client for database operations
    const adminClient = createAdminClient()

    // First, try to create the user in auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (authError) {
      console.error("Auth error:", authError)

      // Handle specific auth errors
      if (authError.message.includes("already registered")) {
        return NextResponse.json(
          {
            message: "An account with this email already exists. Please try signing in instead.",
            code: "USER_EXISTS",
          },
          { status: 400 },
        )
      }

      return NextResponse.json({ message: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ message: "Failed to create user" }, { status: 400 })
    }

    // Check if profile already exists (in case of partial registration)
    const { data: existingProfile } = await adminClient
      .from("users")
      .select("id, email")
      .eq("id", authData.user.id)
      .single()

    if (existingProfile) {
      // Update existing profile instead of creating new one
      console.log("Updating existing profile for user:", authData.user.id)
      const { error: updateError } = await adminClient
        .from("users")
        .update({
          email: validatedData.email,
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          graduation_year: Number.parseInt(validatedData.graduationYear),
          degree: validatedData.degree,
          updated_at: new Date().toISOString(),
        })
        .eq("id", authData.user.id)

      if (updateError) {
        console.error("Profile update error:", updateError)
        return NextResponse.json({ message: "Failed to update user profile" }, { status: 500 })
      }
    } else {
      // Create new profile
      console.log("Creating new profile for user:", authData.user.id)
      const { error: profileError } = await adminClient.from("users").insert({
        id: authData.user.id,
        email: validatedData.email,
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        graduation_year: Number.parseInt(validatedData.graduationYear),
        degree: validatedData.degree,
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        return NextResponse.json({ message: "Failed to create user profile" }, { status: 500 })
      }
    }

    return NextResponse.json(
      {
        message: "Registration successful! Please check your email to verify your account before signing in.",
        user: { id: authData.user.id, email: authData.user.email },
        requiresVerification: !authData.user.email_confirmed_at,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data", errors: error.errors }, { status: 400 })
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
