package com.hotelbooking.hotel_booking.controller.client;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.domain.Cart;
import com.hotelbooking.hotel_booking.domain.CartDetail;
import com.hotelbooking.hotel_booking.domain.User;
import com.hotelbooking.hotel_booking.domain.dto.BookingInfo;
import com.hotelbooking.hotel_booking.service.BookingService;
import com.hotelbooking.hotel_booking.service.CartService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@AllArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final CartService cartService;
     @PostMapping("/checkout")
     public ResponseEntity<String> checkout(@RequestBody BookingInfo bookingInfo) {
        try {
            CartDetail cartDetail = cartService.findCartDetailById(bookingInfo.getCartItemIds().getFirst());
            List<CartDetail> items = cartService.findCartDetailByCart(cartDetail.getCart());
            User user = cartService.getCurrentUser();
            bookingService.createBooking(bookingInfo, user ,items);
            Cart cart = cartService.getCurrentUserCart(user);
            cartService.updateCartItemCount(cart);
            return ResponseEntity.ok("Đặt phòng thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi xử lý đặt phòng.");
        }
    }
}
