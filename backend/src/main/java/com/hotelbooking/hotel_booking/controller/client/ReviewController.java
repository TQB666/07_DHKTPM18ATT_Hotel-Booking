package com.hotelbooking.hotel_booking.controller.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.domain.dto.ReviewRequest;
import com.hotelbooking.hotel_booking.service.ReviewService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    private final ReviewService reviewService;
    @PostMapping("/hotels/{hotelId}/reviews")
    public ResponseEntity<?> createReview(
            @PathVariable Long hotelId,
            @RequestBody ReviewRequest reviewRequest
    ) {
        reviewService.save(hotelId, reviewRequest);
        return ResponseEntity.ok("Đánh giá thành công");
    }

    @GetMapping("/hotels/{hotelId}/reviews")
    public ResponseEntity<?> getHotelReviews(@PathVariable Long hotelId) {
        return ResponseEntity.ok(reviewService.getReviewsByHotel(hotelId));
    }
    
}
