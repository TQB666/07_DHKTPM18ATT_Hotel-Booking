package com.hotelbooking.hotel_booking.controller.admin;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.domain.Booking;
import com.hotelbooking.hotel_booking.service.BookingService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/admin/bookings") // Đặt tiền tố /api/admin cho tất cả API admin
@AllArgsConstructor
public class AdminBookingController {

    private final BookingService bookingService;

    /**
     * API lấy tất cả booking
     */
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    /**
     * API lấy chi tiết 1 booking
     */
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok) // Nếu tìm thấy, trả về 200 OK
                .orElse(ResponseEntity.notFound().build()); // Nếu không, trả về 404 Not Found
    }

    /**
     * API cập nhật trạng thái booking (VD: Xác nhận đơn)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {

        String newStatus = statusUpdate.get("status"); // "CONFIRMED", "CANCELLED"
        String newPaymentStatus = statusUpdate.get("paymentStatus"); // "PAID"

        try {
            Booking updatedBooking = bookingService.updateBookingStatus(id, newStatus, newPaymentStatus);
            return ResponseEntity.ok(updatedBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}