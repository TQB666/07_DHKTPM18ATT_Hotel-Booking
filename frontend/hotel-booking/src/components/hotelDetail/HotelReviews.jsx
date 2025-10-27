import React from "react";

export default function HotelReviews({ hotel }) {
  if (!hotel) return <p>Đang tải dữ liệu khách sạn...</p>;

  const reviews = hotel.reviews || [];

  if (hotel.reviews.length === 0) {
    return (
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Đánh giá của khách hàng</h2>
          <p className="text-gray-500">Chưa có đánh giá nào cho khách sạn này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Đánh giá của khách hàng</h2>

        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex gap-4">
                {/* Avatar: lấy chữ đầu comment nếu chưa có tên */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg">
                  {review.comment?.charAt(0)?.toUpperCase() || "R"}
                </div>

                {/* Nội dung review */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">
                      {review.guestName || "Ẩn danh"}
                    </h5>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-blue-600 text-white text-sm rounded mr-2">
                        {review.rating}
                      </span>
                      <span className="font-semibold text-blue-600">/10</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-2">
                    {review.reviewDate || "Chưa có ngày đánh giá"}
                  </div>

                  <p className="text-gray-700 mb-2">{review.comment}</p>

                  {/* Nếu sau này API có phản hồi từ khách sạn */}
                  {review.hotelReply && (
                    <div className="mt-3 border-l-4 border-blue-600 pl-3 text-sm text-gray-600 bg-gray-50 py-2 rounded">
                      <p className="italic mb-1">
                        Phản hồi từ khách sạn ({review.hotelReply.date}):
                      </p>
                      <p>{review.hotelReply.text}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
