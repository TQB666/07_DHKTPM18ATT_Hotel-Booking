package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.domain.Booking;
import com.hotelbooking.hotel_booking.domain.BookingDetail;
import com.hotelbooking.hotel_booking.repository.BookingDetailRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Service
@AllArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final BookingDetailRepository bookingDetailRepository;

    @Async
    public void sendBookingConfirmationEmail(Booking booking, String confirmUrl) {
        List<BookingDetail> bookingDetails = bookingDetailRepository.findByBooking(booking);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(booking.getEmail());
            helper.setSubject("Xác nhận đặt phòng #" + booking.getId() + " - HotelBooking");

            NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(Locale.of("vi", "VN"));
            // Tạo danh sách chi tiết phòng
            StringBuilder detailsBuilder = new StringBuilder();
            for (BookingDetail detail : bookingDetails) {
                detailsBuilder.append(String.format("""
                    <tr>
                        <td style="padding:8px 12px;">%s</td>
                        <td style="padding:8px 12px;text-align:center;">%d</td>
                        <td style="padding:8px 12px;text-align:center;">%d</td>
                        <td style="padding:8px 12px;">%s</td>
                        <td style="padding:8px 12px;">%s</td>
                        <td style="padding:8px 12px;text-align:right;">%s</td>
                    </tr>
                    """,
                    detail.getRoom().getName(),
                    detail.getNumAdults(),
                    detail.getNumChildren(),
                    detail.getCheckIn(),
                    detail.getCheckOut(),
                    currencyFormatter.format(detail.getPrice())
                ));
            }

            // Tính tổng tiền + VAT
            String totalFormatted = currencyFormatter.format(booking.getTotalPrice());
            String vatFormatted = currencyFormatter.format(booking.getVAT());

            // HTML email
            String html = """
                <div style='font-family:Arial,sans-serif;max-width:700px;margin:auto;border:1px solid #ddd;padding:20px;border-radius:8px;'>
                    <h2>Xin chào, %s 👋</h2>
                    <p>Cảm ơn bạn đã đặt phòng tại <b>HotelBooking</b>.</p>
                    <p>Mã đặt phòng của bạn: <b>%s</b></p>

                    <table style="width:100%%;border-collapse:collapse;margin-top:20px;border:1px solid #ddd;">
                        <thead style="background:#f4f4f4;">
                            <tr>
                                <th style="padding:8px 12px;text-align:left;">Phòng</th>
                                <th style="padding:8px 12px;">Người lớn</th>
                                <th style="padding:8px 12px;">Trẻ em</th>
                                <th style="padding:8px 12px;">Check-in</th>
                                <th style="padding:8px 12px;">Check-out</th>
                                <th style="padding:8px 12px;text-align:right;">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            %s
                        </tbody>
                    </table>

                    <p style="margin-top:20px;font-size:16px;">
                        <b>VAT:</b> %s<br>
                        <b>Tổng tiền:</b> %s
                    </p>

                    <div style="margin-top:30px;text-align:center;">
                        <a href="%s" style="display:inline-block;background:#007bff;color:#fff;
                            padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
                            ✅ Xác nhận đặt phòng
                        </a>
                    </div>

                    <p style="margin-top:30px;color:gray;font-size:12px;text-align:center;">
                        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.<br>
                        © 2025 HotelBooking
                    </p>
                </div>
                """.formatted(
                    booking.getFullName(),
                    booking.getId(),
                    detailsBuilder.toString(),
                    vatFormatted,
                    totalFormatted,
                    confirmUrl
                );

            helper.setText(html, true);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi gửi email xác nhận: " + e.getMessage());
        }
    }
}
