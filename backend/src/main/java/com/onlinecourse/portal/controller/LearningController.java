package com.onlinecourse.portal.controller;

import com.onlinecourse.portal.dto.AssignmentRequest;
import com.onlinecourse.portal.entity.Assignment;
import com.onlinecourse.portal.entity.Certificate;
import com.onlinecourse.portal.entity.Enrollment;
import com.onlinecourse.portal.service.LearningService;
import java.security.Principal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LearningController {
    private final LearningService learningService;

    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }

    @PostMapping("/enrollments/{courseId}")
    public Enrollment enroll(Principal principal, @PathVariable Long courseId) {
        return learningService.enroll(principal.getName(), courseId);
    }

    @PostMapping("/assignments/{courseId}/submit")
    public Assignment submitAssignment(Principal principal, @PathVariable Long courseId, @RequestBody AssignmentRequest request) {
        return learningService.submitAssignment(principal.getName(), courseId, request);
    }

    @PostMapping("/certificates/{courseId}/generate")
    public Certificate generateCertificate(Principal principal, @PathVariable Long courseId) {
        return learningService.generateCertificate(principal.getName(), courseId);
    }
}
