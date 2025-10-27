package com.hotelbooking.hotel_booking.domain.dto;

import java.time.LocalDate;

import lombok.Data;
@Data
public class CartItemRequestDTO {
    private Long roomId;
    private int quantity;
    private int guests;
    private LocalDate checkIn;
    private LocalDate checkOut;
}
