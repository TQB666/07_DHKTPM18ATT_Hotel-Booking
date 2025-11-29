package com.hotelbooking.hotel_booking.controller.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.hotel_booking.domain.Hotel;
import com.hotelbooking.hotel_booking.domain.Tag;
import com.hotelbooking.hotel_booking.domain.dto.TagDTO;
import com.hotelbooking.hotel_booking.service.HotelService;
import com.hotelbooking.hotel_booking.service.TagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/tags")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminTagController {
    private final TagService tagService;
    private final HotelService hotelService;
    @GetMapping
    public List<Tag> getAll() {
        List<Tag> tags = tagService.getAll();
        return tags;
    }

    @PostMapping("/{hotelId}")
    public ResponseEntity<Tag> createHotelTag(
        @PathVariable Long hotelId, 
        @RequestBody TagDTO request) {
        Tag tag = new Tag();
        tag.setName(request.getName());
        Hotel hotel = hotelService.getHotelById(hotelId);
        tag.setHotel(hotel);
        tagService.save(tag);
        return ResponseEntity.ok(tag);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag tagDetails) {
        try {
            Tag tag = tagService.findById(id);
            if (tag == null) {
                return ResponseEntity.notFound().build();
            }

            // Kiểm tra trùng tên với tag khác
            if (!tag.getName().equals(tagDetails.getName()) && 
                tagService.existsByName(tagDetails.getName())) {
                return ResponseEntity.badRequest().build();
            }

            tag.setName(tagDetails.getName());
            Tag updatedTag = tagService.save(tag);
            return ResponseEntity.ok(updatedTag);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTagById(@PathVariable Long id) {
        Tag tag = tagService.findById(id);
        if (tag == null) {
            return ResponseEntity.notFound().build();
        }
        tagService.delete(tag);
        return ResponseEntity.ok().build();
    }

}
