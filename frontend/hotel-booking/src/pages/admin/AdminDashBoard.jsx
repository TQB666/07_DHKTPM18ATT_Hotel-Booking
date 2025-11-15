"use client"

import { useState } from "react"
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Eye, Trash2, Edit } from "lucide-react"

const revenueData = [
    { month: "Jan", revenue: 24000, bookings: 40 },
    { month: "Feb", revenue: 18000, bookings: 32 },
    { month: "Mar", revenue: 28000, bookings: 45 },
    { month: "Apr", revenue: 35000, bookings: 52 },
    { month: "May", revenue: 42000, bookings: 68 },
    { month: "Jun", revenue: 38000, bookings: 61 },
]

const occupancyData = [
    { name: "Phòng đơn", value: 65 },
    { name: "Phòng đôi", value: 78 },
    { name: "Phòng suite", value: 45 },
    { name: "Phòng tổng thống", value: 25 },
]

const bookings = [
    {
        id: 1,
        guest: "Nguyễn Văn A",
        room: "Phòng đôi 101",
        checkIn: "2025-01-15",
        checkOut: "2025-01-18",
        status: "Confirmed",
        total: "2.400.000đ",
    },
    {
        id: 2,
        guest: "Trần Thị B",
        room: "Phòng suite 205",
        checkIn: "2025-01-16",
        checkOut: "2025-01-20",
        status: "Checked In",
        total: "4.800.000đ",
    },
    {
        id: 3,
        guest: "Lê Văn C",
        room: "Phòng đơn 301",
        checkIn: "2025-01-17",
        checkOut: "2025-01-19",
        status: "Pending",
        total: "1.600.000đ",
    },
    {
        id: 4,
        guest: "Phạm Thị D",
        room: "Phòng đôi 102",
        checkIn: "2025-01-18",
        checkOut: "2025-01-22",
        status: "Confirmed",
        total: "3.200.000đ",
    },
]

const COLORS = ["#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredBookings = bookings.filter(
        (booking) =>
            booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.room.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status) => {
        switch (status) {
            case "Confirmed":
                return "bg-blue-100 text-blue-800"
            case "Checked In":
                return "bg-green-100 text-green-800"
            case "Pending":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Tổng đặt phòng</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">1,248</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-lg">
                                        📋
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Doanh thu tháng</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">185M đ</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-lg">
                                        💰
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Phòng trống</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">24</p>
                                </div>
                                <div className="bg-amber-100 p-3 rounded-lg">
                                    <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-white text-lg">
                                        🛏️
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Tỷ lệ chiếm dụng</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-2">78%</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-lg">
                                        📊
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Doanh thu & Đặt phòng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip contentStyle={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }} />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#0ea5e9" name="Doanh thu (K)" />
                                    <Bar dataKey="bookings" fill="#8b5cf6" name="Số đặt phòng" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Occupancy Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Chiếm dụng theo loại phòng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={occupancyData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {occupancyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {occupancyData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-semibold text-slate-900">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bookings Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Danh sách đặt phòng gần đây</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khách hoặc phòng..."
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
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
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">ID</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Tên khách</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Phòng</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Ngày nhận</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Ngày trả</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Trạng thái</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Tổng tiền</th>
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-3 px-4 text-slate-900">#{booking.id}</td>
                                            <td className="py-3 px-4 text-slate-900">{booking.guest}</td>
                                            <td className="py-3 px-4 text-slate-600">{booking.room}</td>
                                            <td className="py-3 px-4 text-slate-600">{booking.checkIn}</td>
                                            <td className="py-3 px-4 text-slate-600">{booking.checkOut}</td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 font-semibold text-slate-900">{booking.total}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-amber-100 rounded-lg transition-colors text-amber-600">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
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
    )
}
