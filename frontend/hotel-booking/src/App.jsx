import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HomePage from "./pages/client/HomePage";
import HotelList from "./pages/client/HotelList";
import HotelDetail from "./pages/client/DetailHotelPage";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import CartPage from "./pages/client/CartPage";
import CheckoutPage from "./pages/client/CheckoutPage";
import BookingSuccess from "./pages/client/BookingSuccess";
import ProtectedRoute from "./router/ProtectedRoute";

import AdminBooking from "./pages/admin/AdminBooking";
import AdminBookingDetail from "./pages/admin/AdminBookingDetail";
import AdminUserPage from "./pages/admin/AdminUser";
import AdminUserDetail from "./pages/admin/AdminUserDetail";
import AdminUserEdit from "./pages/admin/AdminUserEdit";
import AdminRoom from "./pages/admin/AdminRoom";
import AdminRoomDetail from "./pages/admin/AdminRoomDetail";
import AdminRoomEdit from "./pages/admin/AdminRoomEdit";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* === Public routes === */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/HotelList/:city" element={<HotelList />} />
        <Route path="/HotelList" element={<HotelList />} />
        <Route path="/HotelDetail/:id" element={<HotelDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        {/* === Protected routes (ĐÃ SỬA ĐÚNG) === */}
        {/* Route 1: Trang Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />{" "}
        {/* <--- KẾT THÚC ROUTE /ADMIN Ở ĐÂY (dùng '/>') */}
        {/* Route 2: Trang Quản lý Booking (độc lập) */}
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminBooking />
            </ProtectedRoute>
          }
        />
        {/* Route 3: Trang Chi tiết Booking (độc lập) */}
        <Route
          path="/admin/bookings/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminBookingDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminUserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminUserEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/room"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/room/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminRoomDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/room/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminRoomEdit />
            </ProtectedRoute>
          }
        />
        {/* Đặt các route admin khác ở đây (ví dụ /admin/users)
            ngang hàng với các route trên
        */}
      </Routes>
    </Router>
  );
}
