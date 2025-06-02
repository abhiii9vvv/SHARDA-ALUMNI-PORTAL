"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, ChevronDown, User, LogOut } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

interface NavigationProps {
  onNavigate: (page: string) => void
  isLoggedIn?: boolean
  user?: any
  onLogout?: () => void
}

export default function Navigation({ onNavigate, isLoggedIn = false, user, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: "Home", href: "/", action: () => router.push("/") },
    {
      name: "Alumni",
      href: "/alumni",
      hasDropdown: true,
      dropdownItems: [
        { name: "Alumni Directory", href: "/alumni/directory", action: () => router.push("/alumni/directory") },
        { name: "Notable Alumni", href: "/success-stories", action: () => router.push("/success-stories") },
        { name: "Alumni Chapters", href: "/alumni/chapters", action: () => router.push("/alumni/chapters") },
        { name: "Mentorship", href: "/mentorship", action: () => router.push("/mentorship") },
        { name: "Volunteer", href: "/volunteer", action: () => router.push("/volunteer") },
      ],
    },
    {
      name: "Events",
      href: "/events",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Events", href: "/events", action: () => router.push("/events") },
        { name: "Upcoming Events", href: "/upcoming-events", action: () => router.push("/upcoming-events") },
        { name: "Create Event", href: "/events/create", action: () => router.push("/events/create") },
      ],
    },
    {
      name: "Career",
      href: "/jobs",
      hasDropdown: true,
      dropdownItems: [
        { name: "Job Board", href: "/jobs", action: () => router.push("/jobs") },
        { name: "Career Advice", href: "/career-advice", action: () => router.push("/career-advice") },
        { name: "Professional Development", href: "/professional-development", action: () => router.push("/professional-development") },
      ],
    },
    { name: "About", href: "/about", action: () => router.push("/about") },
    { name: "Contact", href: "/contact", action: () => router.push("/contact") },
  ]

  const handleSearch = () => {
    const searchTerm = prompt("What would you like to search for?")
    if (searchTerm) {
      alert(`Searching for: ${searchTerm}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
            <Image
              src="/images/sharda-logo.png"
              alt="Sharda University Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain mr-3"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Sharda University</h1>
              <p className="text-xs text-blue-300">Alumni Connect</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  onClick={item.action}
                  className="text-gray-200 hover:text-white px-4 py-2 rounded-md transition-colors font-medium text-sm flex items-center"
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                </button>

                {item.hasDropdown && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                    <div className="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <button
                          key={dropdownItem.name}
                          onClick={dropdownItem.action}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSearch}
              className="text-gray-200 hover:text-white hover:bg-blue-800/50"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("profile")}
                  className="text-gray-200 hover:text-white hover:bg-blue-800/50"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user?.name || "Profile"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="border-red-400 text-red-300 hover:bg-red-800/50 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("login")}
                  className="border-blue-400 text-blue-200 hover:bg-blue-800/50 hover:text-white"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate("signup")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
                >
                  Join Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-gray-900 to-blue-900 border-gray-800">
                <div className="flex flex-col space-y-6 mt-6">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <button
                        onClick={() => {
                          item.action()
                          if (!item.hasDropdown) setIsOpen(false)
                        }}
                        className="text-gray-200 hover:text-white transition-colors font-medium flex items-center w-full text-left"
                      >
                        {item.name}
                        {item.hasDropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                      </button>

                      {item.hasDropdown && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => {
                                dropdownItem.action()
                                setIsOpen(false)
                              }}
                              className="block text-sm text-gray-400 hover:text-white py-1 w-full text-left"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-6 border-t border-gray-800 space-y-3">
                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            onNavigate("profile")
                            setIsOpen(false)
                          }}
                          className="w-full border-blue-400 text-blue-300 hover:bg-blue-800/50 hover:text-white"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            onLogout?.()
                            setIsOpen(false)
                          }}
                          className="w-full border-red-400 text-red-300 hover:bg-red-800/50 hover:text-white"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            onNavigate("login")
                            setIsOpen(false)
                          }}
                          className="w-full border-blue-400 text-blue-300 hover:bg-blue-800/50 hover:text-white"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            onNavigate("signup")
                            setIsOpen(false)
                          }}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                        >
                          Join Now
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
