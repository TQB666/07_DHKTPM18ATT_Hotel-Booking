package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}