package com.hotelbooking.hotel_booking.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hotelbooking.hotel_booking.domain.User;
import com.hotelbooking.hotel_booking.service.UserService;

import lombok.AllArgsConstructor;
@AllArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService{
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        } 

        return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName())));
    }
    
}
