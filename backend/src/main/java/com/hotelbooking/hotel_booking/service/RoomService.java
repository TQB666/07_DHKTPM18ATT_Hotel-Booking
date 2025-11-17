package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.domain.Room;
import com.hotelbooking.hotel_booking.domain.dto.RoomDTO;
import com.hotelbooking.hotel_booking.domain.dto.HotelDTO;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    // Lấy tất cả phòng
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Convert Room entity to RoomDTO
    private RoomDTO convertToDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setId(room.getId());
        dto.setName(room.getName());
        dto.setCapacity(room.getCapacity());
        dto.setPrice(room.getPrice());
        dto.setQuantity(room.getQuantity());
        dto.setDescription(room.getDescription());
        dto.setStatus(room.getStatus());
        dto.setImage(room.getImage());

        if (room.getHotel() != null) {
            HotelDTO hotelDTO = new HotelDTO();
            hotelDTO.setId(room.getHotel().getId());
            hotelDTO.setName(room.getHotel().getName());
            hotelDTO.setAddress(room.getHotel().getAddress());
            hotelDTO.setCity(room.getHotel().getCity());
            hotelDTO.setPhone(room.getHotel().getPhone());
            hotelDTO.setRating(room.getHotel().getRating());
            hotelDTO.setShortDesc(room.getHotel().getShortDesc());
            dto.setHotel(hotelDTO);
        }

        return dto;
    }

    // Lấy phòng theo ID
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id).orElse(null);
        return room != null ? convertToDTO(room) : null;
    }

    // Tạo phòng mới
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    // Cập nhật phòng
//    public Room updateRoom(Long id, Room updated) {
//        Room room = getRoomById(id);
//
//        room.setName(updated.getName());
//        room.setDescription(updated.getDescription());
//        room.setCapacity(updated.getCapacity());
//        room.setStatus(updated.getStatus());
//
//        return roomRepository.save(room);
//    }
}

