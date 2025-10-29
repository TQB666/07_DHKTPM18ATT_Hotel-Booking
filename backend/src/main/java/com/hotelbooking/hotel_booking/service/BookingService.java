package com.hotelbooking.hotel_booking.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.Booking;
import com.hotelbooking.hotel_booking.domain.BookingDetail;
import com.hotelbooking.hotel_booking.domain.CartDetail;
import com.hotelbooking.hotel_booking.domain.User;
import com.hotelbooking.hotel_booking.domain.dto.BookingInfo;
import com.hotelbooking.hotel_booking.repository.BookingDetailRepository;
import com.hotelbooking.hotel_booking.repository.BookingRepository;
import com.hotelbooking.hotel_booking.repository.CartDetailRepository;
import com.hotelbooking.hotel_booking.repository.CartRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class BookingService {
    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final CartDetailRepository cartDetailRepository;
    private final CartRepository cartRepository;
    
    public Booking createBooking(BookingInfo bookingInfo, User user, List<CartDetail> cartDetail) {
        //  Tạo đối tượng Booking
        Booking booking = new Booking();

        booking.setFullName(bookingInfo.getFullName());
        booking.setEmail(bookingInfo.getEmail());
        booking.setPhoneNumber(bookingInfo.getPhoneNumber());
        booking.setTotalPrice(bookingInfo.getTotalPrice());
        booking.setVAT(0.08);// 8%
        booking.setBookingDate(LocalDateTime.now());
        booking.setPaymentMethod("CASH");//"CASH", "BANK_TRANSFER", "MOMO",...
        booking.setPaymentStatus("PAID");//"PENDING": chưa thanh toán, "PAID": thanh toán thành công
        booking.setStatus("PENDING");// "PENDING": chờ xác nhận, "CONFIRMED": đã xác nhận
        booking.setUser(user);
        booking.setVoucher(null);
        bookingRepository.save(booking);
        
        // Tạo đối tượng BookingDetail
        cartDetail.stream().forEach(c->{
            BookingDetail bookingDetail = new BookingDetail();
            bookingDetail.setBooking(booking);
            bookingDetail.setCheckIn(c.getCheckIn());
            bookingDetail.setCheckOut(c.getCheckOut());
            bookingDetail.setNumAdults(c.getNumAdults());
            bookingDetail.setNumChildren(c.getNumChildren());
            bookingDetail.setPrice(c.getPrice());
            bookingDetail.setQuantity(c.getQuantity());
            bookingDetail.setRoom(c.getRoom());

            bookingDetailRepository.save(bookingDetail);

            cartDetailRepository.deleteById(c.getId());
        });

        return booking;
    }
}
