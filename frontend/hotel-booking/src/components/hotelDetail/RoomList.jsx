import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import cartApi from "../../api/cartApi";
export default function RoomList({ hotel }) {
  const navigate = useNavigate();
  const [selectedQuantities, setSelectedQuantities] = useState({});

  if (!hotel) return <p>Đang tải dữ liệu khách sạn...</p>;

  const handleQuantityChange = (roomId, value) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [roomId]: Number(value),
    }));
  };

  const handleAddToCart = async (room) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const selectedQty = selectedQuantities[room.id] || 1;
    // Lấy thông tin từ session storage
    const bookingInfo = JSON.parse(sessionStorage.getItem("bookingInfo")) || {
      guests: 2,
      checkIn: "2025-10-26",
      checkOut: "2025-10-27"
    };
    try {
    const cartData = {
      roomId: room.id,
      quantity: selectedQty,
      guests: bookingInfo.guests,
      checkIn: bookingInfo.checkIn,
      checkOut: bookingInfo.checkOut
    };

    // Sử dụng cartApi
    const result = await cartApi.addToCart(cartData);
    
    console.log("Thêm vào giỏ hàng thành công:", result);
    
    // Thông báo thành công
    alert("Đã thêm phòng vào giỏ hàng!");
    
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
  }
  };

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Danh sách phòng</h2>

        <div className="flex flex-col gap-6">
          {hotel.rooms.map((room) => (
            <div
              key={room.id}
              className="border rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition"
            >
              {/* Header */}
              <div className="bg-gray-100 px-4 py-2 font-semibold">
                {room.name}
              </div>

              {/* Body */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image */}
                <div>
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-700 mb-3">{room.description}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    👥 Sức chứa: {room.capacity} người
                  </p>
                  <p className="text-sm text-gray-500">
                    🏨 Tình trạng:{" "}
                    <span
                      className={`font-semibold ${
                        room.status === "available"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {room.status === "available" ? "Còn phòng" : "Hết phòng"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    🏠 Số lượng còn trống: {room.quantity}
                  </p>
                </div>

                {/* Price + Select + Button */}
                <div className="flex flex-col justify-between text-left md:text-right">
                  <div>
                    <p className="text-gray-500 text-sm">Giá / đêm</p>
                    <p className="text-xl font-bold text-blue-600">
                      {room.price.toLocaleString()}₫
                    </p>
                  </div>

                  {/* Select số lượng có icon */}
                  <div className="mt-4 flex md:justify-end items-center gap-2">
                    <label className="text-sm text-gray-600">Số lượng:</label>

                    <div className="relative w-28">
                      <select
                        value={selectedQuantities[room.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(room.id, e.target.value)
                        }
                        disabled={room.status !== "available"}
                        className="
                          appearance-none w-full px-3 py-2 rounded-lg
                          border border-gray-300 bg-white text-gray-700 text-sm
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-all duration-200
                          shadow-sm hover:border-blue-400
                          disabled:opacity-60 disabled:cursor-not-allowed
                        "
                      >
                        {Array.from(
                          { length: room.quantity },
                          (_, i) => i + 1
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>

                      {/* Icon mũi tên */}
                      <ChevronDown
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  <button
                    className="bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                    disabled={room.status !== "available"}
                    onClick={() => handleAddToCart(room)}
                  >
                    {room.status === "available"
                      ? "Thêm Vào Giỏ Hàng"
                      : "Hết phòng"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
