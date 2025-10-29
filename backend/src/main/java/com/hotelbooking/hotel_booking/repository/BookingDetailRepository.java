package com.hotelbooking.hotel_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelbooking.hotel_booking.domain.BookingDetail;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, Long> {
}
