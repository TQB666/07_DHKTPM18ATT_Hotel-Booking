"use client"
import Sidebar from "@/components/admin/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Eye, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const users = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    role: "User",
    phone: "0123 456 789",
    createdAt: "2024-12-18"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranb@gmail.com",
    role: "User",
    phone: "0987 654 321",
    createdAt: "2024-11-10"
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@gmail.com",
    role: "Admin",
    phone: "0999 888 777",
    createdAt: "2024-01-01"
  }
]

export default function AdminUserPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const roleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700"
      case "User":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-200 text-gray-700"
    }
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
                    placeholder="Tìm tên hoặc email..."
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
                      <th className="p-3 text-left">Ngày tạo</th>
                      <th className="p-3 text-left">Hành động</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-slate-50">
                        <td className="p-3">#{user.id}</td>
                        <td className="p-3 font-semibold">{user.name}</td>
                        <td className="p-3 text-slate-700">{user.email}</td>
                        <td className="p-3 text-slate-700">{user.phone}</td>

                        <td className="p-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${roleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>

                        <td className="p-3 text-slate-700">{user.createdAt}</td>

                        <td className="p-3">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg">
                              <Edit className="w-4 h-4" />
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
