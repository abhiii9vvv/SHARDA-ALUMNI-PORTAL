import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import MadeByAbhinav from "@/components/MadeByAbhinav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sharda University Alumni Portal",
  description:
    "Connect with fellow alumni, discover opportunities, and stay engaged with the Sharda University community.",
  keywords: ["Sharda University", "Alumni", "Network", "Jobs", "Events"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
          <MadeByAbhinav />
        </AuthProvider>
      </body>
    </html>
  )
}
