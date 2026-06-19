package iuh.fit.backend.request;

import iuh.fit.backend.domain.UserRole;
import lombok.Data;

/**
 * @author TrungNguyen
 * @created 4/27/2026
 * @description
 */

@Data
public class LoginOtpRequest {
    private String email;
    private String otp;
    private UserRole role;

}
