package com.hotelbooking.hotel_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelbooking.hotel_booking.domain.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    
} 
