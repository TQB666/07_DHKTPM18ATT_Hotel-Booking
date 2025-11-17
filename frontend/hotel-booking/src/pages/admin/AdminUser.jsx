"use client"
import Sidebar from "@/components/admin/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Eye, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AdminUserPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios.get("http://localhost:8080/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("User Data:", res.data)
        setUsers(res.data)
      })
      .catch(err => console.error("Lỗi load user:", err))
  }, [])

  const filteredUsers = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const roleColor = (roleName) => {
    if (!roleName) return "bg-gray-200 text-gray-700"
    return roleName === "ADMIN"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700"
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-slate-200 sticky top-0 px-8 py-4 z-40">
          <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        </div>

        <div className="p-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Danh sách người dùng</CardTitle>

                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="Tìm tên, email hoặc SDT..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-slate-100">
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Tên</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Số điện thoại</th>
                      <th className="p-3 text-left">Vai trò</th>
                      <th className="p-3 text-left">Hành động</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-slate-50">
                        <td className="p-3">#{user.id}</td>
                        <td className="p-3 font-semibold">{user.fullName}</td>
                        <td className="p-3 text-slate-700">{user.email}</td>
                        <td className="p-3 text-slate-700">{user.phone}</td>

                        {/* FIX ROLE NULL */}
                        <td className="p-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${roleColor(user.roleName)}`}>
                            {user.roleName || "USER"}
                          </span>
                        </td>

                        {/* FIX createdAt NULL */}
                        
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                              className="p-2 hover:bg-blue-100 rounded-xl"
                            >
                              <Eye size={20} className="text-blue-600" />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                              className="p-2 hover:bg-amber-100 rounded-xl"
                            >
                              <Edit size={20} className="text-amber-600" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
