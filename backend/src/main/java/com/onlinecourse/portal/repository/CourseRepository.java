package com.onlinecourse.portal.repository;

import com.onlinecourse.portal.entity.Course;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTitleContainingIgnoreCaseAndCategoryContainingIgnoreCase(String title, String category);
}
