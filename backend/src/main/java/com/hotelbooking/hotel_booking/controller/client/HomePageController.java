package com.hotelbooking.hotel_booking.controller.client;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.service.HotelService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/api/hotels")
public class HomePageController {
    private final HotelService hotelService;

    @GetMapping("/by-city")
    public List<Map<String, Object>> getHotelCountByCity() {
        return hotelService.getHotelCountByCity();
    }
    
}
