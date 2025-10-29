package com.hotelbooking.hotel_booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotelbooking.hotel_booking.domain.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel,Long>, JpaSpecificationExecutor<Hotel>{
    List<Hotel> findAll();
    // Đếm số hotel theo city, trả về list object
    @Query("SELECT h.city AS city, COUNT(h) AS totalHotels FROM Hotel h GROUP BY h.city")
    List<Object[]> countHotelsByCity();

    List<Hotel> findByCity(String city);
}
