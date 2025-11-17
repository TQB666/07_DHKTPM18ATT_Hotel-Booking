"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Star, Users, DollarSign, Package } from "lucide-react";

export default function AdminHotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`http://localhost:8080/api/admin/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHotel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi load hotel detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Đang tải...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Không tìm thấy khách sạn
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl"
              onClick={() => navigate("/admin/hotel")}
            >
              ←
            </button>
            <h1 className="text-3xl font-bold">Chi tiết khách sạn</h1>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left: Featured Image */}
          <div className="col-span-1">
            <Card>
              <CardContent className="p-0">
                {hotel.image ? (
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-600">Không có ảnh</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Hotel Info */}
          <div className="col-span-2 space-y-6">
            {/* Card 1: Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{hotel.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Thành phố</p>
                    <p className="font-medium text-lg">{hotel.city || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Địa chỉ</p>
                    <p className="font-medium text-lg">{hotel.address || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={20} className="text-green-600" />
                  <div>
                    <p className="text-slate-500 text-sm">Điện thoại</p>
                    <p className="font-medium text-lg">{hotel.phone || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Star size={20} className="text-yellow-400" />
                  <div>
                    <p className="text-slate-500 text-sm">Đánh giá</p>
                    <p className="font-medium text-lg flex items-center gap-1">
                      {"⭐".repeat(hotel.rating || 0)} ({hotel.rating || 0}/5)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Descriptions */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả ngắn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{hotel.shortDesc || "Không có mô tả"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mô tả chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{hotel.detailDesc || "Không có mô tả chi tiết"}</p>
              </CardContent>
            </Card>

            {/* Card 3: Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Tiện ích</CardTitle>
              </CardHeader>
              <CardContent>
                {hotel.facilities?.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1">
                    {hotel.facilities.map((f) => (
                      <li key={f.id}>{f.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có tiện ích</p>
                )}
              </CardContent>
            </Card>

            {/* Card 4: Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {hotel.tags?.length > 0 ? (
                  hotel.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-gray-200 px-3 py-1 rounded-lg font-medium"
                    >
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <p>Không có tags</p>
                )}
              </CardContent>
            </Card>

            {/* Card 5: Rooms */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách phòng</CardTitle>
              </CardHeader>
              <CardContent>
                {hotel.rooms?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Tên phòng</th>
                          <th className="px-4 py-2 text-left">Giá</th>
                          <th className="px-4 py-2 text-left">Sức chứa</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {hotel.rooms.map((room) => (
                          <tr key={room.id}>
                            <td className="px-4 py-2">{room.name}</td>
                            <td className="px-4 py-2">{room.price?.toLocaleString()} VND</td>
                            <td className="px-4 py-2">{room.capacity} người</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>Không có phòng</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
