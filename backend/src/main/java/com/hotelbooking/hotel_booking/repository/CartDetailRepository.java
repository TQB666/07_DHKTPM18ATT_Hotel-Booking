package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.domain.Cart;
import com.hotelbooking.hotel_booking.domain.CartDetail;
import com.hotelbooking.hotel_booking.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    List<CartDetail> findByCart(Cart cart);
    Optional<CartDetail> findByCartAndRoom(Cart cart, Room room);
    void deleteAllByCart(Cart cart);
    long countByCart(Cart cart);
}