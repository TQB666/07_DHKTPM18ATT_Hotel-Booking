package com.hotelbooking.hotel_booking.controller.admin;

import com.hotelbooking.hotel_booking.domain.Room;
import com.hotelbooking.hotel_booking.domain.dto.RoomDTO;
import com.hotelbooking.hotel_booking.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/rooms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminRoomController {
    private final RoomService roomService;

    @GetMapping
    public List<RoomDTO> getAllRooms() {
        List<RoomDTO> rooms = roomService.getAllRooms();
        return rooms;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable Long id) {
        RoomDTO room = roomService.getRoomById(id);
        if (room == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id, @RequestBody Room updated) {
        Room updatedRoom = roomService.updateRoom(id, updated);
        if (updatedRoom == null) {
            return ResponseEntity.notFound().build();
        }
        RoomDTO updatedRoomDTO = convertToDTO(updatedRoom);
        return ResponseEntity.ok(updatedRoomDTO);
    }

    private RoomDTO convertToDTO(Room room) {
        return roomService.convertToDTO(room);
    }
}
