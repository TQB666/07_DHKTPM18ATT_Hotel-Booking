"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import { Link } from "react-router-dom";
import { Search, Pencil, Trash2, Eye, Edit } from "lucide-react";

export default function AdminVoucherList() {
    const [vouchers, setVouchers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:8080/api/admin/voucher", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setVouchers(res.data));
    }, []);

    const filtered = vouchers.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase())
    );

    const deleteVoucher = (id) => {
        if (!window.confirm("Xóa voucher này?")) return;
        const token = localStorage.getItem("token");

        axios
            .delete(`http://localhost:8080/api/admin/voucher/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                setVouchers((prev) => prev.filter((x) => x.id !== id));
            });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            <Sidebar />

            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Voucher</h1>

                    <Link
                        to="/admin/voucher/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        + Tạo Voucher
                    </Link>
                </div>

                {/* Search */}
                <div className="relative w-80 mb-4">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        placeholder="Tìm voucher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <table className="w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="bg-slate-200 text-left">
                            <th className="p-3">Tên</th>
                            <th className="p-3">Giảm (%)</th>
                            <th className="p-3">Bắt đầu</th>
                            <th className="p-3">Kết thúc</th>
                            <th className="p-3">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((v) => (
                            <tr key={v.id} className="border-b">
                                <td className="p-3">{v.name}</td>
                                <td className="p-3">{v.discount}%</td>
                                <td className="p-3">{v.startDate}</td>
                                <td className="p-3">{v.endDate}</td>

                                <td className="p-3 flex gap-3">
                                    <Link to={`/admin/voucher/detail/${v.id}`}>
                                        <Eye size={20} className="text-blue-600" />
                                    </Link>

                                    <Link to={`/admin/voucher/edit/${v.id}`}>
                                        <Edit size={20} className="text-amber-600" />
                                    </Link>

                                    <button onClick={() => deleteVoucher(v.id)}>
                                        <Trash2 size={20} className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center p-4">
                                    Không tìm thấy kết quả
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
