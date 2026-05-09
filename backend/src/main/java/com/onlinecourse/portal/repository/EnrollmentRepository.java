package com.onlinecourse.portal.repository;

import com.onlinecourse.portal.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {}
