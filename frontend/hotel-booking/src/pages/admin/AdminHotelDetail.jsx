"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Star, Users, DollarSign, Package } from "lucide-react";
import { createHotelTag, updateTag, deleteTag } from "@/api/hotelApi";

export default function AdminHotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // CRUD tag cho khách sạn
  const [tagEditMode, setTagEditMode] = useState(false);
  const [editingTagId, setEditingTagId] = useState(null);
  const [newTagName, setNewTagName] = useState("");

  // Fetch hotel details
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
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Lỗi load hotel detail:", err);
        setLoading(false);
      });
  }, [id]);

  // Thêm tag mới vào khách sạn
  const handleAddTag = async () => {
    const name = prompt("Tên tag mới:");
    if (!name || name.trim() === "") return;

    try {
      const newTag = await createHotelTag(hotel.id, { 
        name: name.trim() 
      });
      
      // Cập nhật hotel data với tag mới
      setHotel(prevHotel => ({
        ...prevHotel,
        tags: [...prevHotel.tags, newTag]
      }));
      
      alert('Thêm tag thành công!');
    } catch (error) {
      alert(error.message || 'Lỗi khi thêm tag');
    }
  };

  // Cập nhật tag
  const handleUpdateTag = async (tagId, newName) => {
    if (!newName || newName.trim() === "") {
      alert("Tên tag không được để trống");
      return false;
    }

    try {
      const updatedTag = await updateTag(tagId, { name: newName.trim() });

      // Cập nhật hotel data
      setHotel(prevHotel => ({
        ...prevHotel,
        tags: prevHotel.tags.map(tag => 
          tag.id === tagId ? updatedTag : tag
        )
      }));
      
      return true;
    } catch (error) {
      alert(error.message || 'Lỗi khi cập nhật tag');
      return false;
    }
  };

  // Xóa tag khỏi khách sạn
  const handleDeleteTag = async (tagId) => {
    const tagToDelete = hotel.tags.find(tag => tag.id === tagId);
    if (!tagToDelete) return;

    if (window.confirm(`Bạn có chắc muốn xóa tag "${tagToDelete.name}"?`)) {
      try {
        await deleteTag(tagId);

        // Cập nhật hotel data - xóa tag
        setHotel(prevHotel => ({
          ...prevHotel,
          tags: prevHotel.tags.filter(tag => tag.id !== tagId)
        }));

        alert('Xóa tag thành công!');
      } catch (error) {
        alert(error.message || 'Lỗi khi xóa tag');
      }
    }
  };

  // Save editing
  const saveEditTag = async () => {
    if (editingTagId && newTagName.trim()) {
      const success = await handleUpdateTag(editingTagId, newTagName);
      if (success) {
        setEditingTagId(null);
        setNewTagName("");
      }
    }
  };

  // Cancel editing
  const cancelEditTag = () => {
    setEditingTagId(null);
    setNewTagName("");
  };

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
          <div className="col-span-1 space-y-4">
            {/* Ảnh đại diện */}
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

            {/* Bộ sưu tập ảnh */}
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh khác</CardTitle>
              </CardHeader>
              <CardContent>
                {hotel.images?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {hotel.images.map((img) => (
                      <div key={img.id} className="w-full h-28">
                        <img
                          src={img.imageUrl}
                          alt={img.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Không có hình ảnh thêm</p>
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
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="flex flex-row justify-between items-center pb-3">
                <CardTitle className="text-lg font-semibold">Tags của khách sạn</CardTitle>

                {/* Nút setting */}
                <button
                  onClick={() => {
                    setTagEditMode(!tagEditMode);
                    setEditingTagId(null);
                    setNewTagName("");
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label={tagEditMode ? "Thoát chế độ chỉnh sửa" : "Chỉnh sửa tags"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-settings text-gray-600"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .69.39 1.31 1 1.51h.09a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-3">
                {/* Hiển thị tags của khách sạn */}
                {hotel.tags?.length > 0 ? (
                  hotel.tags.map((tag) => (
                    <div key={tag.id} className="relative group">
                      {/* Nếu đang sửa thẻ này */}
                      {editingTagId === tag.id ? (
                        <div className="flex items-center">
                          <input
                            autoFocus
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            className="px-3 py-1.5 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Nhập tên tag..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                saveEditTag();
                              } else if (e.key === 'Escape') {
                                cancelEditTag();
                              }
                            }}
                          />
                          <div className="ml-2 flex gap-1">
                            <button
                              onClick={saveEditTag}
                              className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
                              aria-label="Lưu thay đổi"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                            <button
                              onClick={cancelEditTag}
                              className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600 transition-colors"
                              aria-label="Hủy thay đổi"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-medium border border-blue-200 transition-all group-hover:bg-blue-200">
                            {tag.name}
                          </span>
                          
                          {/* Icon chỉnh sửa & xóa */}
                          {tagEditMode && (
                            <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {/* Edit */}
                              <button
                                onClick={() => {
                                  setEditingTagId(tag.id);
                                  setNewTagName(tag.name);
                                }}
                                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors shadow-sm"
                                aria-label={`Chỉnh sửa tag ${tag.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteTag(tag.id)}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                aria-label={`Xóa tag ${tag.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Khách sạn chưa có tags</p>
                )}

                {/* Thêm tag mới - chỉ hiện khi edit mode */}
                {tagEditMode && (
                  <button
                    className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors border border-green-200 flex items-center gap-1"
                    onClick={handleAddTag}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Thêm tag
                  </button>
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
                          <th className="px-4 py-2 text-left">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {hotel.rooms.map((room) => (
                          <tr
                            key={room.id}
                            className="cursor-pointer hover:bg-slate-100 transition"
                            onClick={() => navigate(`/admin/room/${room.id}`)}
                          >
                            <td className="px-4 py-2">{room.name}</td>
                            <td className="px-4 py-2">{room.price?.toLocaleString()} VND</td>
                            <td className="px-4 py-2">{room.capacity} người</td>
                            <td className="px-4 py-2">{room.status}</td>
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