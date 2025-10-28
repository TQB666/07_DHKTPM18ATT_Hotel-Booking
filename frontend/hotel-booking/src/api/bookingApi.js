import api from "../config/axiosConfig";

const bookingApi = {
  // Gửi thông tin đặt phòng và giỏ hàng lên server
  checkout: async (payload) => {
    const response = await api.post("/booking/checkout", payload);
    return response.data;
  },
};

export default bookingApi;
