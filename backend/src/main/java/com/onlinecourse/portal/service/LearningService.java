package com.onlinecourse.portal.service;

import com.onlinecourse.portal.dto.AssignmentRequest;
import com.onlinecourse.portal.entity.Assignment;
import com.onlinecourse.portal.entity.Certificate;
import com.onlinecourse.portal.entity.Enrollment;
import com.onlinecourse.portal.repository.AssignmentRepository;
import com.onlinecourse.portal.repository.CertificateRepository;
import com.onlinecourse.portal.repository.CourseRepository;
import com.onlinecourse.portal.repository.EnrollmentRepository;
import com.onlinecourse.portal.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class LearningService {
    private final EnrollmentRepository enrollmentRepository;
    private final AssignmentRepository assignmentRepository;
    private final CertificateRepository certificateRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public LearningService(EnrollmentRepository enrollmentRepository, AssignmentRepository assignmentRepository, CertificateRepository certificateRepository, CourseRepository courseRepository, UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.assignmentRepository = assignmentRepository;
        this.certificateRepository = certificateRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public Enrollment enroll(String email, Long courseId) {
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(userRepository.findByEmail(email).orElseThrow());
        enrollment.setCourse(courseRepository.findById(courseId).orElseThrow());
        return enrollmentRepository.save(enrollment);
    }

    public Assignment submitAssignment(String email, Long courseId, AssignmentRequest request) {
        Assignment assignment = new Assignment();
        assignment.setStudent(userRepository.findByEmail(email).orElseThrow());
        assignment.setCourse(courseRepository.findById(courseId).orElseThrow());
        assignment.setTitle(request.title());
        assignment.setSubmissionUrl(request.submissionUrl());
        return assignmentRepository.save(assignment);
    }

    public Certificate generateCertificate(String email, Long courseId) {
        Certificate certificate = new Certificate();
        certificate.setStudent(userRepository.findByEmail(email).orElseThrow());
        certificate.setCourse(courseRepository.findById(courseId).orElseThrow());
        return certificateRepository.save(certificate);
    }
}
