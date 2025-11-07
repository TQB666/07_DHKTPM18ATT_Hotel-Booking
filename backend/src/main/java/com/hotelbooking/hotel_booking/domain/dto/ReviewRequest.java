package com.hotelbooking.hotel_booking.domain.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private int rating;
    private String comment;
}
