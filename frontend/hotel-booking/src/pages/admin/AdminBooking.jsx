import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBookings } from "../../api/adminBookingApi"; 

// 1. Import Card, Icons, và Sidebar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // (Giả sử bạn dùng shadcn/ui)
import { Search, Receipt, Eye } from "lucide-react"; 
import Sidebar from "@/components/admin/Sidebar"; // <-- ĐẢM BẢO ĐÚNG ĐƯỜNG DẪN

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (err) {
      setError("Lỗi khi tải danh sách booking: " + (err.message || "Lỗi không xác định"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Lọc booking dựa trên tên hoặc email
  const filteredBookings = bookings.filter(
    (b) =>
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  // Helper gán màu cho status
  const statusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800"; // "CANCELLED" or other
    }
  };

  const paymentStatusColor = (status) => {
     if (status === "PAID") {
        return "bg-blue-100 text-blue-800";
     }
     return "bg-gray-100 text-gray-800"; // "PENDING"
  };

  // Hàm render nội dung (để tránh lặp code cho isLoading/error)
  const renderContent = () => {
    if (isLoading) {
      return <div className="p-8">Đang tải dữ liệu...</div>;
    }

    if (error) {
      return <div className="p-8 text-red-500">{error}</div>;
    }

    return (
      <div className="p-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Danh sách booking</CardTitle>
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
                    <th className="p-3 text-left">Khách hàng</th>
                    <th className="p-3 text-left">Ngày đặt</th>
                    <th className="p-3 text-left">Tổng tiền</th>
                    <th className="p-3 text-left">Trạng thái Đơn</th>
                    <th className="p-3 text-left">Trạng thái TT</th>
                    <th className="p-3 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-slate-50">
                        <td className="p-3">#{booking.id}</td>
                        <td className="p-3">
                          <div className="font-semibold">{booking.fullName}</div>
                          <div className="text-sm text-slate-700">{booking.email}</div>
                        </td>
                        <td className="p-3 text-slate-700">{formatDate(booking.bookingDate)}</td>
                        <td className="p-3 text-red-600 font-semibold">{formatPrice(booking.totalPrice)}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${statusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-semibold ${paymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <Link
                            to={`/admin/bookings/${booking.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center gap-1 w-fit"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Xem</span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-6 text-center text-slate-500">
                        {bookings.length === 0 ? "Không có booking nào." : "Không tìm thấy booking phù hợp."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Return layout chính (gồm Sidebar và nội dung)
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1">
        <div className="bg-white border-b border-slate-200 sticky top-0 px-8 py-4 z-40">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Receipt className="w-8 h-8" />
            Quản lý Booking (Hóa đơn)
          </h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminBooking;