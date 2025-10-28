package com.hotelbooking.hotel_booking.controller.client;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.domain.CartDetail;
import com.hotelbooking.hotel_booking.domain.dto.CartDataRender;
import com.hotelbooking.hotel_booking.domain.dto.CartItemRequestDTO;
import com.hotelbooking.hotel_booking.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class ItemController {
    
    private final CartService cartService;

    // Thêm phòng vào giỏ hàng
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItemRequestDTO request) {
        try {
            CartDetail cartDetail = cartService.addToCart(
                request.getRoomId(),
                request.getQuantity(),
                request.getGuests(),
                request.getCheckIn(),
                request.getCheckOut()
            );
            
            return ResponseEntity.ok().body(cartDetail);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Lấy tất cả items trong giỏ hàng của user
    @GetMapping
    public ResponseEntity<List<CartDataRender>> getCartItems() {
        List<CartDataRender> cartItems = cartService.getCartItems();
        return ResponseEntity.ok(cartItems);
    }

    // Cập nhật số lượng
    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Long itemId,
            @RequestBody Map<String, Integer> body) {
        try {
            int quantity = body.get("quantity");
            CartDetail updatedItem = cartService.updateCartItem(itemId, quantity);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Xóa item khỏi giỏ hàng
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long itemId) {
        try {
            cartService.removeCartItem(itemId);
            return ResponseEntity.ok().body("Đã xóa khỏi giỏ hàng");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Xóa toàn bộ giỏ hàng
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart() {
        try {
            cartService.clearCart();
            return ResponseEntity.ok().body("Đã xóa toàn bộ giỏ hàng");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Cập nhật checkIn, Checkout
    @PutMapping("/items/{itemId}/date")
    public ResponseEntity<?> updateCartItemDate(
            @PathVariable Long itemId,
            @RequestBody Map<String, String> dates) {
        try {
            CartDetail updatedItem = cartService.updateCartItemDate(itemId, dates);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
