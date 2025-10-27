package com.hotelbooking.hotel_booking.service;

import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.Role;
import com.hotelbooking.hotel_booking.domain.User;
import com.hotelbooking.hotel_booking.domain.dto.SignupDTO;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;

import lombok.AllArgsConstructor;

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
}
