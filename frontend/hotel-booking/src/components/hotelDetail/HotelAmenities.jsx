import React from "react";

export default function HotelAmenities({hotel}) {
  if (!hotel) return <p>Đang tải dữ liệu khách sạn...</p>;
  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="font-bold text-2xl mb-6">
          Tất cả những tiện ích tại {hotel.name}
        </h2>

        {/* Amenity Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {hotel.images.slice(0, 5).map((image, index) => (
            <div key={image.id} className="relative">
              <img
                src={image.imageUrl}
                alt={image.name}
                className="w-full h-[120px] object-cover rounded"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-xs py-1 rounded-b">
                {image.name}
              </div>
            </div>
          ))}
        </div>

        {/* Amenity Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(
            hotel.facilities.reduce((acc, facility) => {
              if (!acc[facility.type]) acc[facility.type] = [];
              acc[facility.type].push(facility.name);
              return acc;
            }, {})
          ).map(([type, items], index) => {
            // Map icon cho từng loại tiện ích
            const iconMap = {
              "Tiện nghi phòng": "🛏️",
              "Dịch vụ khách sạn": "🏨",
              "Tiện nghi công cộng": "🏢",
              "Tiện nghi chung": "🔧",
              "Các tiện ích lân cận": "🏪",
              "Vận chuyển": "🚗",
            };

            // Nếu nhóm không có tiện ích thì bỏ qua
            if (!items || items.length === 0) return null;

            return (
              <div key={index} className="bg-white shadow rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <span className="text-xl mr-2">{iconMap[type] || "✨"}</span>
                  <h5 className="font-semibold text-lg">{type}</h5>
                </div>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
