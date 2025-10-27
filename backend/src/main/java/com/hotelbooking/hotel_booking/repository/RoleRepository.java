package com.hotelbooking.hotel_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.hotel_booking.domain.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
    
} 