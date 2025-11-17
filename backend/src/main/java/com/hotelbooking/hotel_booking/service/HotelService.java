package com.hotelbooking.hotel_booking.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.Hotel;
import com.hotelbooking.hotel_booking.domain.Room;
import com.hotelbooking.hotel_booking.repository.HotelRepository;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    
    
    public List<Hotel> getAllHotels(){
        return hotelRepository.findAll();
    }
    
    public List<Map<String, Object>> getHotelCountByCity() {
        List<Object[]> results = hotelRepository.countHotelsByCity();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("city", row[0]);
            map.put("totalHotels", row[1]);
            response.add(map);
        }

        return response;
    }

    public List<Hotel> searchHotels(String city, String name, Integer stars,
                                Double minPrice, Double maxPrice) {
    Specification<Hotel> spec = (root, query, cb) -> {
        List<Predicate> predicates = new ArrayList<>();

        if (city != null && !city.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get("city")), "%" + city.toLowerCase() + "%"));
        }
        if (name != null && !name.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }
        if (stars != null) {
            predicates.add(cb.equal(root.get("rating"), stars));
        }

        // Subquery để tính AVG(Room.price)
        if (minPrice != null || maxPrice != null) {
            Subquery<Double> sub = query.subquery(Double.class);
            Root<Room> roomRoot = sub.from(Room.class);
            sub.select(cb.avg(roomRoot.get("price")))
               .where(cb.equal(roomRoot.get("hotel"), root));

            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(sub, minPrice));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(sub, maxPrice));
            }
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    };

    return hotelRepository.findAll(spec);
    }

    public Hotel getHotelById(Long id){
        return hotelRepository.findById(id).get();
    }

    public Hotel createHotel(Hotel hotel){
        return hotelRepository.save(hotel);
    }

    
    public Hotel updateHotel(Long id, Hotel updatedHotel) {
    Hotel existingHotel = hotelRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Hotel not found with id: " + id));

    // Update các field
    existingHotel.setName(updatedHotel.getName());
    existingHotel.setCity(updatedHotel.getCity());
    existingHotel.setAddress(updatedHotel.getAddress());
    existingHotel.setRating(updatedHotel.getRating());
    existingHotel.setDetailDesc(updatedHotel.getDetailDesc());
    existingHotel.setPhone(updatedHotel.getPhone()); 
    existingHotel.setImage(updatedHotel.getImage()); 
    return hotelRepository.save(existingHotel);
}

}

