package com.hotelbooking.hotel_booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelbooking.hotel_booking.domain.Hotel;
import com.hotelbooking.hotel_booking.domain.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long>{
    List<Review> findByHotel(Hotel hotel);
} 
