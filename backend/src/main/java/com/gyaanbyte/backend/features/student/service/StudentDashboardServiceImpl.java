package com.gyaanbyte.backend.features.student.service;

import com.gyaanbyte.backend.features.auth.dto.UserResponse;
import com.gyaanbyte.backend.features.auth.entity.User;
import com.gyaanbyte.backend.features.auth.repository.UserRepository;
import com.gyaanbyte.backend.features.student.dto.StudentDashboardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentDashboardServiceImpl
        implements StudentDashboardService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public StudentDashboardResponse getDashboard(
            String email
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadCredentialsException(
                                "Authenticated user not found"
                        )
                );

        UserResponse userResponse =
                new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.isEmailVerified()
                );

        StudentDashboardResponse.StudentStats stats =
                new StudentDashboardResponse.StudentStats(
                        0,
                        0,
                        0,
                        0
                );

        return new StudentDashboardResponse(
                userResponse,
                stats,
                List.of(),
                List.of(),
                List.of()
        );
    }
}
