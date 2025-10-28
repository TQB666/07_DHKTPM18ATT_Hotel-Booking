package com.hotelbooking.hotel_booking.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_detail")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double price;

    private int numAdults;

    private int numChildren;

    private LocalDate checkIn;

    private LocalDate checkOut;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private long quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference // tránh vòng lặp khi serialize (cart chứa list cartDetails)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonManagedReference // room không chứa danh sách cartDetail nên an toàn
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Room room;
}
