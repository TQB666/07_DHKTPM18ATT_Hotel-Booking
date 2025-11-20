package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.domain.dto.BookingDTO;
import com.hotelbooking.hotel_booking.domain.dto.UserDTO;
import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.Role;
import com.hotelbooking.hotel_booking.domain.User;
import com.hotelbooking.hotel_booking.domain.dto.SignupDTO;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public User signupDTOtoUser(SignupDTO signupDTO) {
        User user = new User();
        user.setEmail(signupDTO.getEmail());
        user.setFullName(signupDTO.getFirstName() + "" + signupDTO.getLastName());
        user.setPhone(signupDTO.getPhone());
        user.setPassword(signupDTO.getPassword());
        return user;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public void handleSaveUser(User user){
        userRepository.save(user);
    }

    public Role getRoleByName(String nameRole){
        return roleRepository.findByName(nameRole);
    }

    public List<UserDTO> getAllUsersDTO() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getAvatar(),
                        user.getRole() != null ? user.getRole().getName() : null,
                        null   // bookings chưa load trong danh sách
                ))
                .collect(Collectors.toList());
    }



    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAvatar(user.getAvatar());
        dto.setRoleName(user.getRole() != null ? user.getRole().getName() : "USER");

        // 🟦 Convert danh sách booking
        if (user.getBookings() != null) {
            List<BookingDTO> bookingDTOs = user.getBookings().stream()
                    .map(b -> {
                        BookingDTO dtoB = new BookingDTO();
                        dtoB.setId(b.getId());
                        dtoB.setBookingDate(b.getBookingDate());
                        dtoB.setStatus(b.getStatus());
                        dtoB.setTotalPrice(b.getTotalPrice());
                        return dtoB;
                    })
                    .toList();

            dto.setBookings(bookingDTOs);
        }


        return dto;
    }


    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());

        if (userDTO.getRoleName() != null) {
            Role role = roleRepository.findByName(userDTO.getRoleName());
            user.setRole(role);
        }

        userRepository.save(user);

        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getAvatar(),
                user.getRole() != null ? user.getRole().getName() : null,
                null // không trả bookings khi update
        );
    }

}
