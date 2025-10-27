import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearchChange }) => {
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  const formatDate = (date) => date.toISOString().split("T")[0];

  // ✅ Khi render lần đầu → tự động gán ngày mặc định
  useEffect(() => {
    if (!checkIn) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCheckIn(formatDate(tomorrow));

      const nextDay = new Date(tomorrow);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatDate(nextDay));
    }
  }, []); // chỉ chạy 1 lần khi mount

  // Nếu người dùng chọn lại checkIn thì tự động cập nhật checkOut 
  useEffect(() => {
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatDate(nextDay));
    }
  }, [checkIn]);

  useEffect(() => {
    onSearchChange?.({ guests, checkIn, checkOut });
  }, [guests, checkIn, checkOut]);

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

  const handleIncrease = () => setGuests((prev) => prev + 1);
  const handleDecrease = () => setGuests((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
      <form
        className="grid grid-cols-12 gap-3 items-stretch"
        onSubmit={handleSearch}
      >
        {/* Địa điểm */}
        <div className="col-span-3 flex items-center border rounded bg-white px-2">
          <span className="mr-2">🔍</span>
          <input
            type="text"
            placeholder="Địa điểm (ví dụ: Đà Lạt)"
            className="w-full outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Ngày nhận phòng */}
        <input
          type="date"
          className="col-span-2 border rounded px-2"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        {/* Ngày trả phòng */}
        <input
          type="date"
          className="col-span-2 border rounded px-2"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        {/* Số lượng khách */}
        <div className="col-span-3 border rounded bg-white px-3 py-2 flex items-center justify-between">
          <div>
            <strong className="block text-sm text-gray-600">
              Số lượng khách
            </strong>
            <span className="text-gray-800 text-base">👥 {guests} khách</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDecrease}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-7 h-7 rounded"
            >
              −
            </button>
            <button
              type="button"
              onClick={handleIncrease}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-7 h-7 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <button
          type="submit"
          className="col-span-2 bg-orange-500 text-white rounded-lg font-semibold px-4 py-2 hover:bg-orange-600 transition"
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
