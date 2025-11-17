"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function AdminRoomEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    name: "",
    capacity: 0,
    price: 0,
    quantity: 0,
    description: "",
    status: "AVAILABLE",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/api/admin/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRoom({
          name: res.data.name,
          capacity: res.data.capacity,
          price: res.data.price,
          quantity: res.data.quantity,
          description: res.data.description,
          status: res.data.status,
          image: res.data.image,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi load phòng:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue =
      name === "capacity" || name === "price" || name === "quantity"
        ? name === "price"
          ? parseFloat(value)
          : parseInt(value)
        : value;

    setRoom((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/api/admin/rooms/${id}`, room, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Update response:", res.data);
        alert("Cập nhật phòng thành công");
        navigate(`/admin/room/${id}`);
      })
      .catch((err) => {
        console.error("Lỗi cập nhật phòng:", err.response?.data || err.message);
        alert(
          "Cập nhật thất bại: " + (err.response?.data?.message || err.message)
        );
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            className="flex items-center px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Chỉnh sửa phòng</h1>
        </div>

        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">Thông tin cơ bản</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tên phòng */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Tên phòng
                </label>
                <input
                  type="text"
                  name="name"
                  value={room.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên phòng"
                  required
                />
              </div>

              {/* Sức chứa */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Sức chứa (người)
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={room.capacity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>

              {/* Giá */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Giá/đêm (VND)
                </label>
                <input
                  type="number"
                  name="price"
                  value={room.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="1000"
                  required
                />
              </div>

              {/* Số lượng phòng */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Số lượng phòng
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={room.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  required
                />
              </div>

              {/* Trạng thái */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={room.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AVAILABLE">Có sẵn</option>
                  <option value="OCCUPIED">Đã đặt</option>
                  <option value="MAINTENANCE">Bảo trì</option>
                  <option value="UNAVAILABLE">Không hoạt động</option>
                </select>
              </div>

              {/* Ảnh URL */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Ảnh (URL)
                </label>
                <input
                  type="text"
                  name="image"
                  value={room.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập URL ảnh phòng"
                />
                {room.image && (
                  <div className="mt-3">
                    <p className="text-slate-600 text-sm mb-2">Preview ảnh:</p>
                    <img
                      src={room.image}
                      alt="Room preview"
                      className="w-48 h-40 object-cover rounded-lg"
                      onError={() => console.error("Ảnh không tìm thấy")}
                    />
                  </div>
                )}
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-slate-600 font-medium mb-2">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={room.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="5"
                  placeholder="Nhập mô tả phòng"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-lg font-semibold transition"
                  onClick={() => navigate(-1)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {submitting ? "Đang lưu..." : "Lưu phòng"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
