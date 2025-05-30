"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("users").select("id, first_name, last_name, email, graduation_year, role, verified")
    if (!error) setUsers(data || [])
    setLoading(false)
  }

  const handleVerify = async (id: string, verified: boolean) => {
    await supabase.from("users").update({ verified: !verified }).eq("id", id)
    fetchUsers()
  }

  const handleRole = async (id: string, role: string) => {
    const newRole = role === "admin" ? "user" : "admin"
    await supabase.from("users").update({ role: newRole }).eq("id", id)
    fetchUsers()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
            <p className="text-gray-500 text-sm mt-2">Manage users, verify alumni, and assign admin roles.</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Grad Year</th>
                      <th className="p-2 text-left">Role</th>
                      <th className="p-2 text-left">Verified</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b">
                        <td className="p-2">{u.first_name} {u.last_name}</td>
                        <td className="p-2">{u.email}</td>
                        <td className="p-2">{u.graduation_year || "-"}</td>
                        <td className="p-2">{u.role}</td>
                        <td className="p-2">{u.verified ? "✅" : "❌"}</td>
                        <td className="p-2 flex gap-2">
                          <Button size="sm" variant={u.verified ? "outline" : "default"} onClick={() => handleVerify(u.id, u.verified)}>
                            {u.verified ? "Unverify" : "Verify"}
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => handleRole(u.id, u.role)}>
                            {u.role === "admin" ? "Demote" : "Make Admin"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 