"use client"
import { useAuth } from "@/context/AuthContext"
import Sidebar from "./Sidebar"
import OverviewContent from "./OverviewContent"

const DashboardOverview = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <OverviewContent />
      </div>
    </div>
  )
}

export default DashboardOverview
