package com.hotelbooking.hotel_booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
// @SpringBootApplication(
// 	exclude = org.springframework.boot.autoconfigure.security.servlet
// 	.SecurityAutoConfiguration.class //enable authentication
// )
public class HotelBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelBookingApplication.class, args);
	}

}
