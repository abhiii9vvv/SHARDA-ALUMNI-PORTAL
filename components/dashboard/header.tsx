import { Button } from "@/components/ui/button"
import { Bell, Search, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardHeader() {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "You have been signed out successfully." });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          {user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.profile_image_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email || user?.id}`} />
                <AvatarFallback>{profile?.first_name?.[0] || user.email?.[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-700 text-sm">{profile?.first_name || user.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="ml-2 border-red-400 text-red-500 hover:bg-red-100">
                <LogOut className="h-4 w-4 mr-1" /> Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}