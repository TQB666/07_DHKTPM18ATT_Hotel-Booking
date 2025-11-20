package com.hotelbooking.hotel_booking.domain.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingDTO {
    private long id;
    private LocalDateTime bookingDate;
    private String status;
    private double totalPrice;
}
