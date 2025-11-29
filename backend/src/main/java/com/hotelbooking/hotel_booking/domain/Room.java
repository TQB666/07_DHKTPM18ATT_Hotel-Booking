package com.hotelbooking.hotel_booking.domain;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private int capacity;

    private double price;

    private int quantity;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    private String status;

    private String image;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Hotel hotel;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    Set<CartDetail> cartDetails;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    Set<BookingDetail> bookingDetails;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private Set<Image> images;
}
