package com.hotelbooking.hotel_booking.domain.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingInfo {
    private String fullName;
    private String email;
    private String phoneNumber;
    private List<Long> cartItemIds;
    private double totalPrice;
}
