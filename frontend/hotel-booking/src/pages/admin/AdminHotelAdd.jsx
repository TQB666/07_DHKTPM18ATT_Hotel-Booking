"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminHotelAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    rating: 1,
    city: "",
    shortDesc: "",
    detailDesc: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8080/api/admin/hotels", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLoading(false);
        navigate("/admin/hotels");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Thêm mới khách sạn</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên khách sạn</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Thành phố</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Điện thoại</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Đánh giá (1-5)</label>
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              value={form.rating}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh đại diện (URL)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
            <textarea
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={2}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
            <textarea
              name="detailDesc"
              value={form.detailDesc}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={4}
            ></textarea>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              disabled={loading}
            >
              {loading ? "Đang thêm..." : "Thêm mới"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/hotel")}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
