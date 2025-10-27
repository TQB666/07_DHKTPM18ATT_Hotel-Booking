import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Khách sạn", path: "/HotelList" },
    { name: "Tours", path: "/tours" },
    { name: "Vé máy bay", path: "/flights" },
    { name: "Vé vui chơi", path: "/tickets" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <i className="bi bi-building"></i> HotelBooking
        </Link>

        {/* Toggle mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu links */}
        <ul
          className={`md:flex md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.path} className="px-4 md:px-0 py-2 md:py-0">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition ${
                    isActive ? "font-semibold text-yellow-300" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!token ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Đăng nhập
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* Giỏ hàng */}
              <Link
                to="/cart"
                className="bg-white text-blue-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition flex items-center gap-1"
              >
                <i className="bi bi-cart"></i> Giỏ hàng
              </Link>

              {/* Dropdown user */}
              <div className="relative group">
                <button className="bg-white text-blue-600 px-3 py-2 rounded-lg flex items-center gap-1">
                  <i className="bi bi-person-circle"></i> {email}
                </button>
                <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                  <li>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Thông tin cá nhân
                    </button>
                  </li>
                  {role === "ROLE_ADMIN" && (
                    <li>
                      <button
                        onClick={() => navigate("/admin")}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Trang Admin
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
