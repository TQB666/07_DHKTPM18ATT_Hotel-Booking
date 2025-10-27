package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.domain.Cart;
import com.hotelbooking.hotel_booking.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}