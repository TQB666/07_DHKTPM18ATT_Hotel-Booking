import React, { useState, useEffect } from "react";
import { addHotelReview, fetchHotelReviews } from "../../api/ratingApi";

export default function HotelReviews({ hotel }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!(email && token);

  const loadReviews = async () => {
    if (!hotel?.id) return;
    try {
      const data = await fetchHotelReviews(hotel.id);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error load reviews: ", err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [hotel?.id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    try {
      await addHotelReview(hotel.id, { rating, comment });
      alert("Gửi đánh giá thành công");
      setRating(0);
      setComment("");
      await loadReviews();
    } catch (err) {
      alert("Gửi đánh giá thất bại");
      console.error(err);
    }
  };

  const Star = ({ index }) => (
    <span
      onClick={() => isLoggedIn && setRating(index)}
      className={`cursor-pointer text-2xl ${rating >= index ? "text-yellow-400" : "text-gray-300"}`}
    >
      ★
    </span>
  );

  if (!hotel) return <p>Đang tải dữ liệu khách sạn...</p>;

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Đánh giá của khách hàng</h2>

        {isLoggedIn ? (
          <form onSubmit={submitReview} className="mb-8 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Viết đánh giá của bạn</h3>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} index={i} />)}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded mb-2"
              rows="3"
              placeholder="Nhập cảm nhận của bạn..."
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Gửi đánh giá
            </button>
          </form>
        ) : (
          <p className="mb-6 text-gray-600 italic">Bạn cần đăng nhập để đánh giá</p>
        )}

        {reviews.length === 0 && (
          <p className="text-gray-500">Chưa có đánh giá nào cho khách sạn này.</p>
        )}

        <div className="flex flex-col gap-6 mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg">
                  {review.comment?.charAt(0)?.toUpperCase() || "R"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">{review.guestName || "Ẩn danh"}</h5>
                    <div className="text-yellow-400 text-lg">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {review.reviewDate || "Chưa có ngày đánh giá"}
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
