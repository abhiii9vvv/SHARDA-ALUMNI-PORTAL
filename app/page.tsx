"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import EnhancedHero from "@/enhanced-hero"
import FeaturesSection from "@/features-section"
import StatsSection from "@/stats-section"
import UpcomingEvents from "@/upcoming-events"
import SuccessStories from "@/success-stories"
import JobBoardSection from "@/job-board-section"
import PartnersSection from "@/partners-section"
import ContactSection from "@/contact-section"
import Footer from "@/footer"
import LoginPage from "../login-page"
import SignupPage from "../signup-page"
import VideoModal from "../video-modal"
import EventModal from "../event-modal"
import MadeByAbhinav from "@/components/MadeByAbhinav"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("home")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleNavigate = (page: string) => {
    // Handle navigation with alerts for pages not yet implemented
    if (page === "home") {
      setCurrentPage(page)
    } else if (page === "login" || page === "signup") {
      setCurrentPage(page)
    } else {
      // For other pages, show alert and stay on current page
      alert(`${page.charAt(0).toUpperCase() + page.slice(1)} page coming soon!`)
    }
  }

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true)
    setUser(userData)
    setCurrentPage("home")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage("home")
  }

  const handleShowVideo = () => {
    setShowVideoModal(true)
  }

  const handleEventAction = (action: string, event?: any) => {
    if (action === "rsvp" || action === "learn-more") {
      setSelectedEvent(event)
      setShowEventModal(true)
    } else if (action === "view-all") {
      alert("Events page coming soon!")
    }
  }

  const handleStoryAction = (action: string, story?: any) => {
    if (action === "read-more") {
      alert(`Reading story: ${story?.title || "Story details coming soon!"}`)
    } else if (action === "submit" || action === "read-all") {
      alert("Success Stories page coming soon!")
    }
  }

  const handlePartnerAction = (action: string, partner?: any) => {
    if (action === "discover-more") {
      alert(`Partner details: ${partner?.name || "Partner information coming soon!"}`)
    } else if (action === "partner-with-us" || action === "view-all") {
      alert("Partners page coming soon!")
    }
  }

  const handleJobAction = (action: string, job?: any) => {
    if (action === "browse" || action === "view-all" || action === "post-job") {
      alert("Job Board page coming soon!")
    } else if (action === "create-profile") {
      if (isLoggedIn) {
        alert("Profile page coming soon!")
      } else {
        setCurrentPage("signup")
      }
    } else if (action === "apply") {
      alert(`Applying for job: ${job?.title || "Job application coming soon!"}`)
    }
  }

  const handleContactAction = (action: string) => {
    if (action === "send-message") {
      alert("Message sent successfully!")
    } else if (action === "call") {
      window.open("tel:+911204174000")
    } else if (action === "email") {
      window.open("mailto:alumni@sharda.ac.in")
    }
  }

  const handleFeatureAction = (feature: string) => {
    alert(`${feature} feature coming soon!`)
  }

  const handleNewsletterSubscribe = (email: string) => {
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`)
    } else {
      alert("Please enter a valid email address")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={handleNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <main>
        {currentPage === "login" ? (
          <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
        ) : currentPage === "signup" ? (
          <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />
        ) : (
          <>
            <EnhancedHero onNavigate={handleNavigate} onShowVideo={handleShowVideo} />
            <StatsSection />
            <FeaturesSection onNavigate={handleNavigate} onFeatureAction={handleFeatureAction} />
            <UpcomingEvents onEventAction={handleEventAction} />
            <SuccessStories onStoryAction={handleStoryAction} />
            <JobBoardSection onJobAction={handleJobAction} />
            <PartnersSection onPartnerAction={handlePartnerAction} />
            <ContactSection onContactAction={handleContactAction} />
          </>
        )}
      </main>
      <Footer onNavigate={handleNavigate} onNewsletterSubscribe={handleNewsletterSubscribe} />
      <MadeByAbhinav />
      {/* Modals */}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
      {showEventModal && selectedEvent && <EventModal event={selectedEvent} onClose={() => setShowEventModal(false)} />}
    </div>
  )
}
