package com.onlinecourse.portal.dto;

public record CourseRequest(String title, String description, String category, Double price, String materialUrl, Long trainerId) {}
