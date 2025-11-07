package com.hotelbooking.hotel_booking.domain.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ReviewResponse {
    private Long id;
    private String comment;
    private int rating;
    private LocalDate reviewDate;
    private String guestName;
}
