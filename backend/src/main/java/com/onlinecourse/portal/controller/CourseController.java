package com.onlinecourse.portal.controller;

import com.onlinecourse.portal.dto.CourseRequest;
import com.onlinecourse.portal.entity.Course;
import com.onlinecourse.portal.service.CourseService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> search(@RequestParam(required = false) String keyword, @RequestParam(required = false) String category) {
        return courseService.search(keyword, category);
    }

    @PostMapping
    public Course create(@RequestBody CourseRequest request) {
        return courseService.create(request);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody CourseRequest request) {
        return courseService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
}
