import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onQuantityChange, onDateChange, onRemove }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) onQuantityChange(item.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDateChange = (field, value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset giờ

    let newCheckIn = new Date(item.checkIn);
    let newCheckOut = new Date(item.checkOut);

    if (field === "checkIn") {
      newCheckIn = new Date(value);

      // Check-in không được trước hôm nay
      if (newCheckIn < today) {
        alert("Ngày check-in không được nhỏ hơn ngày hiện tại!");
        return;
      }

      // Nếu checkIn >= checkOut → tự tăng checkOut lên 1 ngày
      if (newCheckOut <= newCheckIn) {
        newCheckOut = new Date(newCheckIn);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        onDateChange(item.id, "checkOut", newCheckOut.toISOString().split("T")[0]);
      }

      onDateChange(item.id, "checkIn", value);
    }

    if (field === "checkOut") {
      newCheckOut = new Date(value);

      // Check-out phải sau check-in ít nhất 1 ngày
      const minCheckOut = new Date(newCheckIn);
      minCheckOut.setDate(minCheckOut.getDate() + 1);

      if (newCheckOut < minCheckOut) {
        alert("Ngày check-out phải sau check-in ít nhất 1 ngày!");
        return;
      }

      onDateChange(item.id, "checkOut", value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <Link to={`/HotelDetail/${item.hotel_id}`}>
        <img
          src={item.image}
          alt={item.roomName}
          className="w-full md:w-64 h-64 object-cover"
        />
      </Link>

      <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Thông tin phòng */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
            {item.roomName}
            </h3>
            <p className="text-base text-gray-500 mb-2">
              Khách sạn: {item.hotelName}
            </p>
            <p className="text-gray-600">
              Giá / đêm:{" "}
              <span className="text-blue-600 font-semibold">
                {item.price.toLocaleString("vi-VN")}₫
              </span>
            </p>
        </div>

        {/* Check-in / Check-out */}
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div>
            <label className="text-sm text-gray-500">Check-in</label>
            <input
              type="date"
              value={item.checkIn}
              onChange={(e) => handleDateChange("checkIn", e.target.value)}
              className="block border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Check-out</label>
            <input
              type="date"
              value={item.checkOut}
              onChange={(e) => handleDateChange("checkOut", e.target.value)}
              className="block border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Điều khiển số lượng + tổng tiền */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              className="p-1 border rounded-md hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 text-gray-800">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="p-1 border rounded-md hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <p className="font-semibold text-blue-700">
            {(() => {
              const checkInDate = new Date(item.checkIn);
              const checkOutDate = new Date(item.checkOut);
              const diffDays = Math.max(
                1,
                Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
              );
              const total = item.price * item.quantity * diffDays;
              return `Tổng: ${total.toLocaleString("vi-VN")}₫ (${diffDays} đêm)`;
            })()}
          </p>

          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-600 cursor-pointer transition-transform hover:scale-110"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
