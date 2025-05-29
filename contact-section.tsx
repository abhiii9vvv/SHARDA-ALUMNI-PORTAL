"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"

interface ContactSectionProps {
  onContactAction: (action: string) => void
}

export default function ContactSection({ onContactAction }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContactAction("send-message")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Contact Us</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about alumni services, events, or partnerships? We're here to help you stay connected with
            the Sharda University community. Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-4">Get in Touch</CardTitle>
                <p className="text-gray-300 leading-relaxed">
                  Connect with our alumni relations team for support, inquiries, or to learn more about how you can get
                  involved with the Sharda University alumni community.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300 text-sm mb-2">Call us during business hours</p>
                    <button
                      onClick={() => onContactAction("call")}
                      className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      +91 120 417 4000
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-300 text-sm mb-2">Send us a message anytime</p>
                    <button
                      onClick={() => onContactAction("email")}
                      className="text-green-400 hover:text-green-300 transition-colors font-medium"
                    >
                      alumni@sharda.ac.in
                    </button>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Address</h3>
                    <p className="text-gray-300 text-sm mb-2">Visit our campus</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Plot No. 32-34, Knowledge Park III,
                      <br />
                      Greater Noida, Uttar Pradesh 201310
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-300 text-sm mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300 text-sm">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-2">Send us a Message</CardTitle>
                <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-colors"
                  >
                    Send Message
                  </Button>

                  <p className="text-gray-400 text-sm text-center">
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-3">Need immediate assistance?</h3>
            <p className="text-gray-300 mb-4">
              For urgent matters, please call our alumni helpline or send a direct email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => onContactAction("call")}
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                Call Now: +91 120 417 4000
              </Button>
              <Button
                variant="outline"
                onClick={() => onContactAction("email")}
                className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
              >
                Email: alumni@sharda.ac.in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
