import React, { useEffect, useState } from "react";
import cartApi from "../../api/cartApi"; // đường dẫn tới file bạn gửi
import Header from "../../components/homepage/Header";
import Footer from "../../components/homepage/Footer";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧾 Hàm gọi API giỏ hàng
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartApi.getCart(); // dùng hàm trong cartApi
      setCartItems(data);
      console.log(data);
      
    } catch (err) {
      console.error("Lỗi khi tải giỏ hàng:", err);
      setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartApi.removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("❌ Lỗi khi xóa sản phẩm:", err);
      alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, newQty) => {
    try {
      await cartApi.updateCartItem(id, newQty);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật số lượng:", err);
      alert("Không thể cập nhật số lượng. Vui lòng thử lại.");
    }
  };

  const updateDate = async (id, field, value) => {
    try {
      await cartApi.updateCartItemDate(id, field, value);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật ngày:", err);
      alert("Không thể cập nhật ngày. Vui lòng thử lại.");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.pricePerNight ?? item.price ?? 0;
    const quantity = item.quantity ?? 1;

        const checkInDate = new Date(item.checkIn);
        const checkOutDate = new Date(item.checkOut);
        const diffDays = Math.max(
            1,
            Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
        ); // ít nhất 1 đêm

        return sum + price * quantity * diffDays;
    }, 0);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải giỏ hàng...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Giỏ hàng của bạn</h2>

        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 mb-8">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onDateChange={updateDate}
                  onRemove={removeItem}
                
                />
              ))}
            </div>

            <div className="flex justify-end">
              <div className="w-full sm:w-[400px]">
                <CartSummary total={totalPrice} />
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Giỏ hàng của bạn đang trống.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
