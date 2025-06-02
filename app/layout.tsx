import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import MadeByAbhinav from "@/components/MadeByAbhinav"
import HomeButton from "@/components/home-button"
import Head from "next/head"

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
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <HomeButton />
          <Toaster />
        </AuthProvider>
        <MadeByAbhinav />
      </body>
    </html>
  )
}
