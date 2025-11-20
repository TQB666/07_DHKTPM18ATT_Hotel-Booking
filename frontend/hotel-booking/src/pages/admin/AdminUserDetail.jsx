"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "@/components/admin/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AdminUserDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios
            .get(`http://localhost:8080/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data))
            .catch((err) => console.error("Lỗi load chi tiết user:", err))
    }, [id])

    const roleColor = (roleName) => {
        if (!roleName) return "bg-gray-200 text-gray-700"
        return roleName === "ADMIN"
            ? "bg-purple-100 text-purple-700"
            : "bg-blue-100 text-blue-700"
    }

    if (!user)
        return (
            <div className="flex justify-center items-center h-screen">Đang tải...</div>
        )

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />

            <div className="flex-1 p-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        className="flex items-center px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-3xl font-bold">Chi tiết người dùng</h1>
                </div>

                {/* USER INFO */}
                <Card className="max-w-3xl mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">{user.fullName}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 text-lg">
                        <div>
                            <p className="text-slate-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>

                        <div>
                            <p className="text-slate-500">Số điện thoại</p>
                            <p className="font-medium">{user.phone}</p>
                        </div>

                        <div>
                            <p className="text-slate-500">Quyền</p>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${roleColor(
                                    user.roleName
                                )}`}
                            >
                                {user.roleName || "USER"}
                            </span>
                        </div>

                        <div>
                            <p className="text-slate-500">Avatar</p>
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400">Không có ảnh</span>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* BOOKING LIST */}
                <Card className="max-w-5xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Lịch sử đặt phòng ({user.bookings?.length || 0})
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {(!user.bookings || user.bookings.length === 0) ? (
                            <p className="text-slate-500">Khách hàng chưa có đơn đặt phòng nào.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-slate-100">
                                            <th className="p-3 text-left">Mã đơn</th>
                                            <th className="p-3 text-left">Ngày đặt</th>
                                            <th className="p-3 text-left">Trạng thái</th>
                                            <th className="p-3 text-left">Thanh toán</th>
                                            <th className="p-3 text-left">Tổng tiền</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {user.bookings.map((b) => (
                                            <tr key={b.id} className="border-b hover:bg-slate-50">
                                                <td className="p-3 font-semibold">#{b.id}</td>
                                                <td className="p-3">
                                                    {new Date(b.bookingDate).toLocaleString()}
                                                </td>
                                                <td className="p-3">{b.status}</td>

                                                <td className="p-3">
                                                    {b.paymentStatus || "Không có"}
                                                </td>

                                                <td className="p-3 font-medium text-blue-600">
                                                    {b.totalPrice.toLocaleString()} VND
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
