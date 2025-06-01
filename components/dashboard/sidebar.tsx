import { Button } from "@/components/ui/button"
import { Home, Users, Briefcase, Calendar, Settings } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "Alumni Network", href: "/dashboard/network" },
  { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
  { icon: Calendar, label: "Events", href: "/dashboard/events" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function DashboardSidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col bg-gray-900 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xl font-bold">Alumni Dashboard</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}