"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import { ArrowLeft } from "lucide-react";

export default function AdminVoucherDetail() {
    const { id } = useParams();
    const [voucher, setVoucher] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/admin/voucher/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setVoucher(res.data));
    }, [id]);

    if (!voucher) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <button
                    className="flex items-center gap-2 px-3 py-2 bg-slate-300 rounded-xl mb-4"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} /> Quay lại
                </button>

                <h1 className="text-3xl font-bold mb-4">Chi tiết Voucher</h1>

                <div className="bg-white shadow rounded-lg p-6 space-y-3 max-w-xl">
                    <p><strong>Tên:</strong> {voucher.name}</p>
                    <p><strong>Giảm giá:</strong> {voucher.discount}%</p>
                    <p><strong>Ngày bắt đầu:</strong> {voucher.startDate}</p>
                    <p><strong>Ngày kết thúc:</strong> {voucher.endDate}</p>
                </div>
            </div>
        </div>
    );
}
