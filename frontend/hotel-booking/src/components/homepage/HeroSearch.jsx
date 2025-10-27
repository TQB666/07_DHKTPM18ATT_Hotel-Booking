import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function HeroSearch() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      // encodeURIComponent để xử lý dấu cách và ký tự đặc biệt (VD: Đà Lạt)
      navigate(`/HotelList/${encodeURIComponent(city.trim())}`);
    } else {
      // nếu bỏ trống thì vào trang tất cả khách sạn
      navigate(`/HotelList`);
    }
  };
  return (
    <div className="relative">
      {/* Background image */}
      <img
        src="/homepage/nhatrang.png"
        alt="hero"
        className="w-full object-cover"
        style={{ height: "50vh" }}
      />

      {/* Search box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-5xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Tìm khách sạn phù hợp cho chuyến đi của bạn
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-4 gap-3" onSubmit={handleSearch}>
          {/* Địa điểm */}
          <input
            type="text"
            placeholder="Bạn muốn đi đâu?"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          {/* Ngày đi */}
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Ngày về */}
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Nút tìm kiếm */}
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  );
}
