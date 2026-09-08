package com.bookstore.service;

import com.bookstore.dto.UserResponse;
import com.bookstore.model.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);
        
        return user.map(this::convertToResponse).orElse(null);
    }

    public UserResponse updateUserProfile(User userDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userDetails.getFirstName() != null) {
                user.setFirstName(userDetails.getFirstName());
            }
            if (userDetails.getLastName() != null) {
                user.setLastName(userDetails.getLastName());
            }
            if (userDetails.getPhoneNumber() != null) {
                user.setPhoneNumber(userDetails.getPhoneNumber());
            }
            if (userDetails.getAddress() != null) {
                user.setAddress(userDetails.getAddress());
            }

            User updatedUser = userRepository.save(user);
            return convertToResponse(updatedUser);
        }

        return null;
    }

    public boolean changePassword(String currentPassword, String newPassword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        String email = authentication.getName();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(currentPassword, user.getPassword())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            }
        }

        return false;
    }

    private UserResponse convertToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setAddress(user.getAddress());
        response.setRole(user.getRole().name());
        return response;
    }
}
