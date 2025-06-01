"use client"

import type React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()
  const router = useRouter()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You can add your newsletter subscription logic here
    setSubscribed(true)
    setEmail("")
  }

  const quickLinks = [
    { name: "Alumni Directory", action: () => router.push("/alumni/directory") },
    { name: "Events Calendar", action: () => router.push("/events") },
    { name: "Job Board", action: () => router.push("/jobs") },
    { name: "Success Stories", action: () => router.push("/success-stories") },
    { name: "Mentorship Program", action: () => router.push("/mentorship") },
    { name: "Volunteer Opportunities", action: () => router.push("/volunteer") },
  ]

  const resources = [
    { name: "Career Advice", action: () => router.push("/career-advice") },
    { name: "Professional Development", action: () => router.push("/professional-development") },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      action: () => window.open("https://facebook.com/shardauniversity", "_blank"),
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => window.open("https://twitter.com/shardauniv", "_blank"),
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://linkedin.com/school/sharda-university", "_blank"),
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      action: () => window.open("https://instagram.com/shardauniversity", "_blank"),
      color: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      icon: Youtube,
      action: () => window.open("https://youtube.com/shardauniversity", "_blank"),
      color: "hover:text-red-500",
    },
  ]

  return (
    <footer className="bg-gray-900 text-white" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          {/* Logo and Description */}
          <div className="mb-12 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="w-12 h-12 mr-3">
                <Image
                  src="/images/sharda-logo.png"
                  alt="Sharda University Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Sharda University</h3>
                <p className="text-blue-400 text-sm">Alumni Connect</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Our mission is to empower Sharda University alumni to connect, grow, and make a difference. We foster lifelong relationships, support career advancement, and inspire global impact through a vibrant, engaged community.
            </p>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-100 hover:text-blue-300 transition-colors text-sm leading-relaxed text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      tabIndex={0}
                      aria-label={link.name}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
              <ul className="space-y-3">
                {resources.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="text-gray-100 hover:text-blue-300 transition-colors text-sm leading-relaxed text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      tabIndex={0}
                      aria-label={link.name}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Connect With Us</h4>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <button
                    onClick={() => window.open("tel:+911204174000")}
                    className="text-gray-100 hover:text-blue-300 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    tabIndex={0}
                    aria-label="Call Sharda University"
                  >
                    +91 120 417 4000
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <button
                    onClick={() => window.open("mailto:alumni@sharda.ac.in")}
                    className="text-gray-100 hover:text-blue-300 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    tabIndex={0}
                    aria-label="Email Sharda University"
                  >
                    alumni@sharda.ac.in
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-100 text-sm leading-relaxed">Knowledge Park III, Greater Noida, UP 201310</p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-sm text-gray-100 mb-4">Follow us on social media</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <button
                        key={index}
                        onClick={social.action}
                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-200 ${social.color} transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
                        aria-label={social.name}
                        tabIndex={0}
                      >
                        <IconComponent className="w-5 h-5" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={subscribed}
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </form>
              <p className="text-gray-400 text-xs mt-2">Get the latest news, events, and opportunities delivered to your inbox.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center lg:text-left">
              © {currentYear} Sharda University Alumni Connect. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookie-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
