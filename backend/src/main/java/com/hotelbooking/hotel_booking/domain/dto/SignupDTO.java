package com.hotelbooking.hotel_booking.domain.dto;

import lombok.Data;

@Data
public class SignupDTO {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
}
