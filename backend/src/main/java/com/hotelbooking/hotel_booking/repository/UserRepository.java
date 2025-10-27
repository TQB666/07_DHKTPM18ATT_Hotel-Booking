package com.hotelbooking.hotel_booking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hotelbooking.hotel_booking.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
