"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect } from "react"

interface VideoModalProps {
  onClose: () => void
}

export default function VideoModal({ onClose }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Sharda University Alumni Story</h3>
              <p className="text-gray-300 mb-6">Discover how our alumni are making a difference around the world</p>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Video content would be embedded here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
