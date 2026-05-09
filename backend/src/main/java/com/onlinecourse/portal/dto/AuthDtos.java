package com.onlinecourse.portal.dto;

import com.onlinecourse.portal.entity.Role;

public class AuthDtos {
    public record RegisterRequest(String name, String email, String password, Role role) {}
    public record LoginRequest(String email, String password) {}
    public record AuthResponse(String token, String name, String email, Role role) {}
}
