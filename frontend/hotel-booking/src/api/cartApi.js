import api from "../config/axiosConfig";

export const cartApi = {
  // Thêm phòng vào giỏ hàng
  addToCart: async (cartData) => {
    const response = await api.post("/cart/add", cartData);
    return response.data;
  },

  // Lấy thông tin giỏ hàng
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  // Cập nhật số lượng phòng trong giỏ hàng
  updateCartItem: async (cartItemId, quantity) => {
    const response = await api.put(`/cart/items/${cartItemId}`, { quantity });
    return response.data;
  },

  // Xóa phòng khỏi giỏ hàng
  removeFromCart: async (cartItemId) => {
    const response = await api.delete(`/cart/items/${cartItemId}`);
    return response.data;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async () => {
    const response = await api.delete("/cart/clear");
    return response.data;
  },
  
  // Cập nhật ngày check-in / check-out
  updateCartItemDate: async (cartItemId, field, value) => {
    // field là "checkIn" hoặc "checkOut"
    const response = await api.put(`/cart/items/${cartItemId}/date`, {
      [field]: value,
    });
    return response.data;
  }
};

export default cartApi;