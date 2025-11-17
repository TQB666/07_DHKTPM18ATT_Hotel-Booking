"use client";
import Sidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminHotelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/admin/hotels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Hotel Data:", res.data);
        setHotels(res.data);
      })
      .catch((err) => console.error("Lỗi load Hotels:", err));
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1">
        <div className="bg-white border-b border-slate-200 sticky top-0 px-8 py-4 z-40">
          <h1 className="text-3xl font-bold">Quản lý khách sạn</h1>
        </div>

        <div className="p-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Danh sách khách sạn</CardTitle>

                <div className="flex gap-4 items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500"
                      placeholder="Tìm tên khách sạn..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => navigate("/admin/hotel/add")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    <Plus size={20} />
                    Thêm khách sạn
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-slate-100">
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Tên khách sạn</th>
                      <th className="p-3 text-left">Địa chỉ</th>
                      <th className="p-3 text-left">Rating</th>
                      <th className="p-3 text-left">Số điện thoại</th>
                      <th className="p-3 text-left">Hành động</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredHotels.length > 0 ? (
                      filteredHotels.map((hotel) => (
                        <tr key={hotel.id} className="border-b hover:bg-slate-50">
                          <td className="p-3">#{hotel.id}</td>

                          <td className="p-3 font-semibold">{hotel.name}</td>

                          <td className="p-3 text-slate-600">
                            {hotel.address || "N/A"}
                          </td>

                          <td className="p-3 text-slate-700 font-semibold">
                            {hotel.rating ?? "N/A"}
                          </td>

                          <td className="p-3 text-slate-700">
                            {hotel.phone || "N/A"}
                          </td>

                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/admin/hotel/${hotel.id}`)
                                }
                                className="p-2 hover:bg-blue-100 rounded-xl"
                              >
                                <Eye size={20} className="text-blue-600" />
                              </button>

                              <button
                                onClick={() =>
                                  navigate(`/admin/hotel/edit/${hotel.id}`)
                                }
                                className="p-2 hover:bg-amber-100 rounded-xl"
                              >
                                <Edit size={20} className="text-amber-600" />
                              </button>

                              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-6 text-center text-slate-500"
                        >
                          Không có khách sạn nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
