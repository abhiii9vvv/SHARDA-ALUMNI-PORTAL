import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      graduationYear?: string
      degree?: string
    } & DefaultSession["user"]
  }

  interface User {
    graduationYear?: string
    degree?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    graduationYear?: string
    degree?: string
  }
}
