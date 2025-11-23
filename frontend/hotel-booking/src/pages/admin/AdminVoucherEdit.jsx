"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import VoucherForm from "@/components/admin/VoucherForm";

export default function AdminVoucherEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get(`http://localhost:8080/api/admin/voucher/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setVoucher(res.data));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        await axios.put(`http://localhost:8080/api/admin/voucher/${id}`, voucher, {
            headers: { Authorization: `Bearer ${token}` },
        });

        alert("Cập nhật thành công!");
        navigate("/admin/voucher");
    };

    if (!voucher) return <div className="p-8">Đang tải...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />

            <div className="flex-1 p-8">
                <form onSubmit={handleSubmit}>
                    <VoucherForm
                        title="Chỉnh sửa Voucher"
                        voucher={voucher}
                        setVoucher={setVoucher}
                        onSubmit={handleSubmit}
                        submitText="Lưu thay đổi"
                    />
                </form>
            </div>
        </div>
    );
}
