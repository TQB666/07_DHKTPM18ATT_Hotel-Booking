package com.hotelbooking.hotel_booking.controller.client;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.domain.Booking;
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
            User user = cartService.getCurrentUser();

            List<CartDetail> items = bookingInfo.getCartItemIds().stream()
                .map(cartService::findCartDetailById)
                .toList();
            
            bookingService.createBooking(bookingInfo, user ,items);
            Cart cart = cartService.getCurrentUserCart(user);
            cartService.updateCartItemCount(cart);
            return ResponseEntity.ok("Đặt phòng thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi xử lý đặt phòng.");
        }
    }

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmBooking(@RequestParam("token") String token) {
        Booking booking = bookingService.findByConfirmationToken(token)
                .orElseThrow(() -> new RuntimeException("Token không hợp lệ"));

        booking.setStatus("CONFIRMED");
        bookingService.save(booking);

        return ResponseEntity.ok("🎉 Đặt phòng của bạn đã được xác nhận thành công!");
    }
}
