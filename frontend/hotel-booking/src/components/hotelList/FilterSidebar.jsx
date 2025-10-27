import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const FilterSidebar = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stars, setStars] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cityURL = params.get("city");

  // Toggle chọn sao
  const toggleStar = (star) => {
    setStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
    console.log(stars);
    
  };

  const handleSearch = () => {
    onFilter({ name, minPrice, maxPrice, stars, cityURL});
  };
  // Hàm chọn nhanh theo khoảng giá
  const handleQuickPrice = (range) => {
    switch (range) {
      case "500K - 1M":
        setMinPrice(500000);
        setMaxPrice(1000000);
        break;
      case "1M - 2M":
        setMinPrice(1000000);
        setMaxPrice(2000000);
        break;
      case "2M - 3M":
        setMinPrice(2000000);
        setMaxPrice(3000000);
        break;
      case "Trên 3M":
        setMinPrice(3000000);
        setMaxPrice(""); // maxPrice để trống nghĩa là >3M
        break;
      default:
        setMinPrice("");
        setMaxPrice("");
    }
  }
  return (
    <div className="space-y-4">
      {/* Tìm theo tên */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h6 className="font-semibold mb-3">🔍 Tìm theo tên</h6>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập tên khách sạn"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium 
                       transition hover:bg-orange-600"
            onClick={handleSearch}
          >
            Tìm
          </button>
        </div>
      </div>

      {/* Lọc theo giá */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h6 className="font-semibold mb-3">$ Giá phòng</h6>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            placeholder="Từ"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Đến"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["500K - 1M", "1M - 2M", "2M - 3M", "Trên 3M"].map((price, i) => (
            <button
              key={i}
              className="px-3 py-2 bg-gray-50 hover:bg-blue-100 rounded-lg border 
                         text-gray-700 transition"
              onClick={() => handleQuickPrice(price)}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Hạng sao */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h6 className="font-semibold mb-3">⭐ Hạng sao</h6>
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center gap-2 text-sm">
              <input type="checkbox" 
              className="accent-blue-600" 
              checked={stars.includes(star)}
              onChange={() => toggleStar(star)}/>

              {"⭐".repeat(star)} {star} sao
            </label>
          ))}
        </div>
      </div>

      {/* Tiện ích */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h6 className="font-semibold mb-3">📋 Tiện ích</h6>
        <div className="space-y-1 text-sm">
          {["Phòng gia đình", "Bãi đậu xe", "Hồ bơi", "Đưa đón sân bay"].map(
            (facility, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                {facility}
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
