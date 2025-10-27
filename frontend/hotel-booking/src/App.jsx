import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HomePage from "./pages/client/HomePage";
import HotelList from "./pages/client/HotelList";
import HotelDetail from "./pages/client/DetailHotelPage";
import AdminPage from "./pages/admin/AdminPage";
import ProtectedRoute from "./router/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/HotelList/:city" element={<HotelList />} />
        <Route path="/HotelList" element={<HotelList />} />
        <Route path="/HotelDetail/:id" element={<HotelDetail />} />
        <Route path="/" element={<HomePage />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
