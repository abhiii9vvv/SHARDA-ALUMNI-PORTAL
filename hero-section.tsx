import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Component() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Sharda University Campus"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Sharda University
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-blue-300">Alumni Connect</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Reconnect with your fellow graduates, expand your professional network, and stay connected with your alma
          mater. Join thousands of Sharda University alumni worldwide.
        </p>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Join Now
        </Button>

        <div className="mt-8 text-sm text-gray-300">
          <p>Connect • Network • Grow</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-5" />
    </section>
  )
}
