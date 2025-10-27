import React from "react";
import { useNavigate, Link } from "react-router-dom";

const HotelCard = ({ hotel, searchData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Ảnh */}
      <Link
        className="md:col-span-4 overflow-hidden rounded-lg group"
        to={`/HotelDetail/${hotel.id}`}
        onClick={() => {
          sessionStorage.setItem("bookingInfo", JSON.stringify(searchData));
        }}
      >
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </Link>


        {/* Nội dung */}
        <div className="md:col-span-8 p-4 flex flex-col justify-between">
          <div className="flex justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{hotel.name}</h3>

              {/* Rating */}
              <p className="mt-1">
                {Array.from({ length: Math.floor(hotel.rating) }, (_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
                <span> ❤️ </span>
                <span className="inline-block bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded ml-1">
                  {hotel.reviews && hotel.reviews.length > 0 ? hotel.reviews.avg : 10}
                </span>
                <b className="text-green-600 ml-1">Tuyệt vời</b>
                <span className="ml-1 text-gray-500">
                  ({hotel.reviews ? hotel.reviews.length : 1} đánh giá)
                </span>
              </p>

              {/* Địa chỉ + mô tả */}
              <p className="text-gray-500 mt-2">📍 {hotel.address}</p>
              <p className="text-gray-700">{hotel.shortDesc}</p>

              {/* Tags */}
              <div className="mt-2">
                {hotel.tags
                  .filter((_, index) => index < 3)
                  .map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-block bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200 mr-2 mb-2"
                    >
                      {tag.name}
                    </span>
                  ))}
              </div>

              {/* Facilities */}
              <div className="mt-2">
                {hotel.facilities
                  .filter((_, index) => index < 6)
                  .map((fac) => (
                    <span
                      key={fac.id}
                      className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 mr-2 mb-2"
                    >
                      {fac.name}
                    </span>
                  ))}
              </div>
            </div>

            {/* Giá + phòng */}
            <div className="text-right min-w-[180px]">
              <p className="text-gray-400 text-sm">*giá trung bình mỗi đêm</p>
              <h5 className="text-orange-500 text-xl font-bold">
                {hotel.price}
              </h5>
              <p className="mt-2 text-lg font-medium">
                {(
                  hotel.rooms.reduce((sum, room) => sum + room.price, 0) /
                  hotel.rooms.length
                ).toLocaleString("vi-VN")}
                đ
              </p>
              <ul className="text-gray-600 text-sm mt-2">
                {hotel.rooms
                  .filter((_, index) => index < 2)
                  .map((room) => (
                    <li key={room.id}>• {room.name}</li>
                  ))}
              </ul>

              <button
                onClick={() => {
                  navigate(`/HotelDetail/${hotel.id}`)
                  sessionStorage.setItem("bookingInfo", JSON.stringify(searchData));
                  }}
                className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
