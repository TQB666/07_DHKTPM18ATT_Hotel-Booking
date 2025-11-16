import api from "../config/axiosConfig"; // Import file api.js chung của bạn

/**
 * Lấy tất cả booking (cho admin)
 */
export const getAllBookings = () => {
  return api.get("/admin/bookings");
};

/**
 * Lấy chi tiết một booking bằng ID
 */
export const getBookingById = (id) => {
  return api.get(`/admin/bookings/${id}`);
};

/**
 * Cập nhật trạng thái booking
 * statusUpdate là object, vd: { status: "CONFIRMED", paymentStatus: "PAID" }
 */
export const updateBookingStatus = (id, statusUpdate) => {
  return api.put(`/admin/bookings/${id}/status`, statusUpdate);
};