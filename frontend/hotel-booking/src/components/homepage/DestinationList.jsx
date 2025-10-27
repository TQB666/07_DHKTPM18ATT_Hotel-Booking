import React, { useEffect, useState } from "react";
import { countHotelByCity } from "../../api/hotelApi"; 
import { useNavigate } from "react-router-dom";

export default function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    countHotelByCity()
      .then((res) => {
        const mapped = res.map((item, index) => ({
          name: item.city,
          hotels: item.totalHotels,
          image: "/homepage/"+item.city+".png",
        }));
        setDestinations(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  

  if (loading) return <p className="text-center my-5">Đang tải dữ liệu...</p>;

  return (
  <div className="container my-5">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Điểm đến yêu thích trong năm</h2>
    <p className="text-gray-600">Lên rừng xuống biển. Trọn vẹn Việt Nam</p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
      {destinations.map((d, i) => (
      <div
      key={i}
      className={`
        relative overflow-hidden rounded-xl shadow-md cursor-pointer group
        ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}   
        ${i === 2 ? "md:col-span-2 md:row-span-2" : ""} 
        ${i === 5 ? "md:col-start-3 md:row-start-1" : ""} 
      `}
      onClick={() => navigate(`/HotelList/${encodeURIComponent(d.name)}`)}
    >
        <img
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h5 className="text-white text-lg font-bold">{d.name}</h5>
          <p className="text-white text-sm">{d.hotels} khách sạn</p>
        </div>
      </div>
    ))}
    </div>
  </div>
);

}
