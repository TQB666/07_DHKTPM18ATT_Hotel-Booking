import api from "../config/axiosConfig";

// Đếm số lượng khách sạn theo city
export const countHotelByCity = async () => {
  try {
    const res = await api.get("/hotels/by-city");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API countHotelByCity:", error);
    throw error;
  }
};

//Tim khach san theo city, name, stars, minPrice, maxPrice
export const getHotels = async ({ city, name, stars, minPrice, maxPrice }) => {
  try {
    const params = {};

    if (city && city.trim() !== "") params.city = city;
    if (name && name.trim() !== "") params.name = name;
    if (stars && stars.length > 0) params.stars = stars.join(",");
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    const res = await api.get("/hotels/filter", { params }); // axios sẽ tự build query string
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API getHotels:", error);
    throw error;
  }
};

// Tìm khách sạn theo id
export const getHotelById = async (id) => {
  try {
    const res = await api.get(`/hotels/${id}`); 
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy khách sạn:", err);
    throw err;
  }
};
