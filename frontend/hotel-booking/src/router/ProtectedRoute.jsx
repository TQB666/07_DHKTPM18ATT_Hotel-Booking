import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // chưa login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // login rồi nhưng không có quyền
    return <Navigate to="/" replace />;
  }

  return children;
}
