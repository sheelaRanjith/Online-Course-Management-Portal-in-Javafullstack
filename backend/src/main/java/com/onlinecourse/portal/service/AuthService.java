package com.onlinecourse.portal.service;

import com.onlinecourse.portal.config.JwtService;
import com.onlinecourse.portal.dto.AuthDtos.AuthResponse;
import com.onlinecourse.portal.dto.AuthDtos.LoginRequest;
import com.onlinecourse.portal.dto.AuthDtos.RegisterRequest;
import com.onlinecourse.portal.entity.Role;
import com.onlinecourse.portal.entity.User;
import com.onlinecourse.portal.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) throw new IllegalArgumentException("Email already registered");
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role() == null ? Role.STUDENT : request.role());
        userRepository.save(user);
        return response(user);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        return response(userRepository.findByEmail(request.email()).orElseThrow());
    }

    private AuthResponse response(User user) {
        return new AuthResponse(jwtService.generateToken(user), user.getName(), user.getEmail(), user.getRole());
    }
}
