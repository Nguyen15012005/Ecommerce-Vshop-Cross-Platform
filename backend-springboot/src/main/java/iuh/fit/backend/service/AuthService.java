package iuh.fit.backend.service;

import iuh.fit.backend.domain.UserRole;
import iuh.fit.backend.request.LoginRequest;
import iuh.fit.backend.response.AuthResponse;
import iuh.fit.backend.response.SignupRequest;

/**
 * @author TrungNguyen
 * @created 4/15/2026
 * @description
 */
public interface AuthService {
    void sentLoginOtp(String email, UserRole role) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse signing(LoginRequest req) throws Exception;
}
