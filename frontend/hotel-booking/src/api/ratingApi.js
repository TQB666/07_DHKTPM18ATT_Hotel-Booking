import api from "../config/axiosConfig";

export const addHotelReview = async (hotelId, reviewData) => {
  try {
    const res = await api.post(`/hotels/${hotelId}/reviews`, reviewData);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    throw error;
  }
};

export const fetchHotelReviews = async (hotelId) => {
  const res = await api.get(`/hotels/${hotelId}/reviews`);
  return res.data;
};
