"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Calendar, MapPin, Users, Clock } from "lucide-react"
import { useState } from "react"

interface EventModalProps {
  event: any
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [isRSVP, setIsRSVP] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    dietaryRequirements: "",
  })

  const handleRSVP = () => {
    setIsRSVP(true)
  }

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`RSVP submitted for ${event.title}! You will receive a confirmation email shortly.`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-2xl font-bold text-gray-900 pr-8">{event.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isRSVP ? (
            <>
              {/* Event Details */}
              <div className="space-y-4">
                <div className="flex items-center text-blue-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>6:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span>Expected Attendees: 200+</span>
                </div>
              </div>

              {/* Event Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                <p className="text-gray-600 leading-relaxed">
                  This event is a great opportunity to reconnect with fellow alumni, share experiences, and build new
                  professional relationships. We'll have networking sessions, guest speakers, and entertainment
                  throughout the evening.
                </p>
              </div>

              {/* Event Agenda */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Agenda</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>6:00 PM - 6:30 PM</span>
                    <span>Registration & Welcome Drinks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6:30 PM - 7:30 PM</span>
                    <span>Networking Session</span>
                  </div>
                  <div className="flex justify-between">
                    <span>7:30 PM - 8:30 PM</span>
                    <span>Keynote Speaker</span>
                  </div>
                  <div className="flex justify-between">
                    <span>8:30 PM - 10:00 PM</span>
                    <span>Dinner & Entertainment</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button onClick={handleRSVP} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  RSVP Now
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Maybe Later
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* RSVP Form */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">RSVP for {event.title}</h3>
                <form onSubmit={handleSubmitRSVP} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        max="5"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dietary">Dietary Requirements</Label>
                    <Textarea
                      id="dietary"
                      placeholder="Please mention any dietary restrictions or allergies"
                      value={formData.dietaryRequirements}
                      onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Confirm RSVP
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsRSVP(false)} className="flex-1">
                      Back
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
