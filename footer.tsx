"use client"

import type React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

interface FooterProps {
  onNavigate: (page: string) => void
  onNewsletterSubscribe: (email: string) => void
}

export default function Footer({ onNavigate, onNewsletterSubscribe }: FooterProps) {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNewsletterSubscribe(email)
    setEmail("")
  }

  const quickLinks = [
    { name: "Alumni Directory", action: () => onNavigate("alumni-directory") },
    { name: "Events Calendar", action: () => onNavigate("events") },
    { name: "Job Board", action: () => onNavigate("job-board") },
    { name: "Success Stories", action: () => onNavigate("success-stories") },
    { name: "Mentorship Program", action: () => alert("Mentorship Program coming soon!") },
    { name: "Volunteer Opportunities", action: () => alert("Volunteer Opportunities coming soon!") },
  ]

  const resources = [
    { name: "Career Advice", action: () => alert("Career Advice resources coming soon!") },
    { name: "Professional Development", action: () => alert("Professional Development coming soon!") },
    { name: "Alumni Benefits", action: () => alert("Alumni Benefits information coming soon!") },
    { name: "Scholarship Programs", action: () => alert("Scholarship Programs coming soon!") },
    { name: "University News", action: () => alert("University News coming soon!") },
    { name: "Contact Support", action: () => onNavigate("contact") },
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
    <footer className="bg-gray-900 text-white">
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
              Connecting graduates worldwide, fostering lifelong relationships, and empowering career growth through our
              vibrant alumni community.
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
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm leading-relaxed text-left"
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
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm leading-relaxed text-left"
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
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    +91 120 417 4000
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <button
                    onClick={() => window.open("mailto:alumni@sharda.ac.in")}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    alumni@sharda.ac.in
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm leading-relaxed">Knowledge Park III, Greater Noida, UP 201310</p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-sm text-gray-300 mb-4">Follow us on social media</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <button
                        key={index}
                        onClick={social.action}
                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                        aria-label={social.name}
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
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Subscribe to our newsletter for the latest alumni news, events, and opportunities.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  Subscribe
                </Button>
              </form>
              <p className="text-gray-400 text-xs mt-3">We respect your privacy. Unsubscribe at any time.</p>
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
              <button
                onClick={() => alert("Privacy Policy coming soon!")}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => alert("Terms of Service coming soon!")}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => alert("Cookie Policy coming soon!")}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
