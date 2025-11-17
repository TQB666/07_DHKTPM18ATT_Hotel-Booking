import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBookingStatus, getBookingById } from "../../api/adminBookingApi";
import Sidebar from "@/components/admin/Sidebar"; // <-- ĐẢM BẢO ĐÚNG ĐƯỜNG DẪN

// Helper component (có thể tách ra file riêng)
const DetailRow = ({ label, value }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);

const AdminBookingDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookingDetail();
  }, [id]);

  const fetchBookingDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getBookingById(id);
      setBooking(response.data);
    } catch (err) {
      setError("Không tìm thấy booking: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus, newPaymentStatus) => {
    if (!window.confirm("Bạn có chắc muốn cập nhật trạng thái đơn hàng này?")) {
      return;
    }
    try {
        const updateData = {};
        if(newStatus) updateData.status = newStatus;
        if(newPaymentStatus) updateData.paymentStatus = newPaymentStatus;

      const response = await updateBookingStatus(id, updateData);
      setBooking(response.data); 
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      alert("Lỗi khi cập nhật: " + err.message);
    }
  };
  
  const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  const formatDate = (dateString) => new Date(dateString).toLocaleString("vi-VN");

  // Hàm render nội dung
  const renderContent = () => {
    if (isLoading) return <div className="p-8">Đang tải...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!booking) return null;

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <button onClick={() => navigate("/admin/bookings")} className="mb-4 text-blue-600 hover:underline">
          &larr; Quay lại danh sách
        </button>

        {/* Thông tin chung & Hành động */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Thông tin chung</h3>
          <dl>
            <DetailRow label="Khách hàng" value={booking.fullName} />
            <DetailRow label="Email" value={booking.email} />
            <DetailRow label="Số điện thoại" value={booking.phoneNumber} />
            <DetailRow label="Ngày đặt" value={formatDate(booking.bookingDate)} />
            <DetailRow label="Tổng tiền" value={<span className="font-bold text-red-600">{formatPrice(booking.totalPrice)}</span>} />
            <DetailRow label="Trạng thái đơn" value={
                <span className={`font-semibold ${booking.status === "CONFIRMED" ? "text-green-600" : "text-yellow-600"}`}>
                    {booking.status}
                </span>
            } />
            <DetailRow label="Trạng thái TT" value={
                <span className={`font-semibold ${booking.paymentStatus === "PAID" ? "text-blue-600" : "text-gray-600"}`}>
                    {booking.paymentStatus}
                </span>
            } />
          </dl>

          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
            {booking.status === "PENDING" && (
              <button
                onClick={() => handleUpdateStatus("CONFIRMED", null)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Xác nhận đơn
              </button>
            )}
            {booking.paymentStatus !== "PAID" && (
                <button
                onClick={() => handleUpdateStatus(null, "PAID")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Đánh dấu đã thanh toán
              </button>
            )}
            {booking.status !== "CANCELLED" && (
                <button
                onClick={() => handleUpdateStatus("CANCELLED", null)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Hủy đơn
              </button>
            )}
          </div>
        </div>

        {/* Chi tiết các phòng đã đặt */}
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Chi tiết phòng đã đặt</h3>
            <div className="space-y-4">
              {booking.bookingDetails && booking.bookingDetails.map(detail => (
                  <div key={detail.id} className="border border-gray-200 rounded-lg p-4">
                      {/* Thêm optional chaining '?' để phòng lỗi trang trắng */}
                      {/* <h4 className="font-semibold text-lg text-blue-700">{detail.room?.name || "Phòng đã bị xóa"}</h4> */}
                      <p>Số lượng: {detail.quantity}</p>
                      <p>Check-in: {formatDate(detail.checkIn)}</p>
                      <p>Check-out: {formatDate(detail.checkOut)}</p>
                      <p>Người lớn: {detail.numAdults} | Trẻ em: {detail.numChildren}</p>
                      <p className="font-medium">Giá: {formatPrice(detail.price)}</p>
                  </div>
              ))}
            </div>
        </div>
      </div>
    );
  };

  // Return layout chính (gồm Sidebar và nội dung)
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1">
        <div className="bg-white border-b border-slate-200 sticky top-0 px-8 py-4 z-40">
          <h1 className="text-3xl font-bold">
            {/* Hiển thị tiêu đề động */}
            {isLoading ? "Đang tải..." : `Chi tiết Booking #${booking?.id || ""}`}
          </h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminBookingDetail;