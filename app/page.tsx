"use client"

import Navigation from "@/components/navigation"
import EnhancedHero from "@/enhanced-hero"
import StatsSection from "@/stats-section"
import FeaturesSection from "@/features-section"
import JobBoardSection from "@/job-board-section"
import Footer from "@/footer"
import MadeByAbhinav from "@/components/MadeByAbhinav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <EnhancedHero onNavigate={() => {}} onShowVideo={() => {}} />
        <StatsSection />
        <FeaturesSection onNavigate={() => {}} onFeatureAction={() => {}} />
        <JobBoardSection onJobAction={() => {}} />
      </main>
      <Footer onNavigate={() => {}} onNewsletterSubscribe={() => {}} />
      <MadeByAbhinav />
    </div>
  )
}
