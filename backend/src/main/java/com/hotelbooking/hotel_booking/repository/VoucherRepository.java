package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.domain.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher,Long> {
}
