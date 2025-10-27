import React, { useRef } from "react";
import HotelHeader from "../../components/hotelDetail/HotelHeader";
import HotelAmenities from "../../components/hotelDetail/HotelAmenities";
import RoomList from "../../components/hotelDetail/RoomList";
import HotelReviews from "../../components/hotelDetail/HotelReviews";
import Header from "../../components/homepage/Header";
import Footer from "../../components/homepage/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHotelById } from "../../api/hotelApi"; 
const DetailHotelPage = () => {
  const {id} = useParams();
  const [hotel, setHotel] = useState(null);
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await getHotelById(id);
        setHotel(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khách sạn:", error);
      }
    };

    fetchHotel();
  }, [id]);

  // ref cho phần RoomList
  const roomListRef = useRef(null);

  // Hàm scroll
  const scrollToRooms = () => {
    if (roomListRef.current) {
      roomListRef.current.scrollIntoView({ behavior: "smooth" });
      // Hiệu ứng highlight nhẹ
      roomListRef.current.classList.add("ring-2", "ring-yellow-400", "transition");
      setTimeout(() => {
        roomListRef.current.classList.remove("ring-2", "ring-yellow-400");
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HotelHeader hotel={hotel} onSelectRoomClick={scrollToRooms}/>
      <HotelAmenities hotel={hotel}/>
      <div ref={roomListRef}>
        <RoomList hotel={hotel} />
      </div>
      <HotelReviews hotel={hotel}/>
      <Footer />
    </div>
  );
};

export default DetailHotelPage;
