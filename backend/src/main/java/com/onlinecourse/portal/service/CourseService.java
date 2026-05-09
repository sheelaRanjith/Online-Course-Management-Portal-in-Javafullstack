package com.onlinecourse.portal.service;

import com.onlinecourse.portal.dto.CourseRequest;
import com.onlinecourse.portal.entity.Course;
import com.onlinecourse.portal.repository.CourseRepository;
import com.onlinecourse.portal.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<Course> search(String keyword, String category) {
        return courseRepository.findByTitleContainingIgnoreCaseAndCategoryContainingIgnoreCase(keyword == null ? "" : keyword, category == null ? "" : category);
    }

    public Course create(CourseRequest request) {
        Course course = new Course();
        apply(course, request);
        return courseRepository.save(course);
    }

    public Course update(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id).orElseThrow();
        apply(course, request);
        return courseRepository.save(course);
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
    }

    private void apply(Course course, CourseRequest request) {
        course.setTitle(request.title());
        course.setDescription(request.description());
        course.setCategory(request.category());
        course.setPrice(request.price());
        course.setMaterialUrl(request.materialUrl());
        if (request.trainerId() != null) course.setTrainer(userRepository.findById(request.trainerId()).orElseThrow());
    }
}
