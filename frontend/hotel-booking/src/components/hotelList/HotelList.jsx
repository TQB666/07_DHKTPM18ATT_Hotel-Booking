import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { useParams } from "react-router-dom";
import { getHotels } from "../../api/hotelApi"; 

const HotelList = ({ filters, searchData }) => {
  const { city } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gom city từ URL + filters từ props
  const combinedFilters = { ...filters, city };

  useEffect(() => {
    setLoading(true);
    getHotels(combinedFilters)
      .then((data) => setHotels(data))
      .catch((err) => console.error("API error:", err))
      .finally(() => setLoading(false));
      console.log(filters);
      
  }, [city, filters]); // gọi lại khi city hoặc filters thay đổi

  if (loading) return <p className="text-center my-5">Đang tải dữ liệu...</p>;

  if (hotels.length === 0) {
    return <p className="text-center my-5">Không tìm thấy khách sạn nào.</p>;
  }

  return (
    <>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} searchData ={searchData}/>
      ))}
    </>
  );
};

export default HotelList;
