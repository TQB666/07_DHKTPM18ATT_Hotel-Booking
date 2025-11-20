package com.hotelbooking.hotel_booking.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String avatar;
    private String roleName; // thêm role
    private List<BookingDTO> bookings;


}
