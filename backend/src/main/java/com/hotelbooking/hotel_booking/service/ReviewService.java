package com.hotelbooking.hotel_booking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.Hotel;
import com.hotelbooking.hotel_booking.domain.Review;
import com.hotelbooking.hotel_booking.domain.User;
import com.hotelbooking.hotel_booking.domain.dto.ReviewRequest;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ReviewRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    private final HotelRepository hotelRepository;
    private final ReviewRepository reviewRepository;
    private final CartService cartService; 
    
    public void save(Long hotelId, ReviewRequest request){

        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + hotelId));

        User user = cartService.getCurrentUser();

        // Tạo review
        Review review = new Review();
        review.setHotel(hotel);
        review.setUser(user);
        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setReviewDate(java.time.LocalDate.now());
        reviewRepository.save(review);


    }

    public List<Review> getReviewsByHotel(Long hotelId) {
    Hotel hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new RuntimeException("Hotel not found"));

    return reviewRepository.findByHotel(hotel);
}
}
