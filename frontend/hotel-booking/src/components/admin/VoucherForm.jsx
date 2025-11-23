"use client";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VoucherForm({ title, voucher, setVoucher, submitText }) {
    const navigate = useNavigate();

    const handleChange = (e) => {
        setVoucher((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-xl bg-white shadow p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold">{title}</h2>

            <div>
                <label className="font-medium">Tên voucher</label>
                <input
                    name="name"
                    value={voucher.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="font-medium">Giảm giá (%)</label>
                <input
                    type="number"
                    name="discount"
                    value={voucher.discount}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="font-medium">Ngày bắt đầu</label>
                <input
                    type="date"
                    name="startDate"
                    value={voucher.startDate}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="font-medium">Ngày kết thúc</label>
                <input
                    type="date"
                    name="endDate"
                    value={voucher.endDate}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="px-4 py-2 bg-slate-300 rounded-lg flex items-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={18} /> Quay lại
                </button>

                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                    {submitText}
                </button>
            </div>
        </div>
    );
}
