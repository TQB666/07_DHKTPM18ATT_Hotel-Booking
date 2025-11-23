"use client";
import { useState } from "react";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import VoucherForm from "@/components/admin/VoucherForm";

export default function AdminVoucherCreate() {
    const navigate = useNavigate();
    const [voucher, setVoucher] = useState({
        name: "",
        discount: 0,
        startDate: "",
        endDate: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        await axios.post("http://localhost:8080/api/admin/voucher", voucher, {
            headers: { Authorization: `Bearer ${token}` },
        });

        alert("Tạo voucher thành công!");
        navigate("/admin/voucher");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />

            <div className="flex-1 p-8">
                <form onSubmit={handleSubmit}>
                    <VoucherForm
                        title="Thêm Voucher"
                        voucher={voucher}
                        setVoucher={setVoucher}
                        onSubmit={handleSubmit}
                        submitText="Tạo voucher"
                    />
                </form>
            </div>
        </div>
    );
}
