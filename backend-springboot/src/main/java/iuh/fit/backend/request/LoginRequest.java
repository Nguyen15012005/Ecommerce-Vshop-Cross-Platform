package iuh.fit.backend.request;

import lombok.Data;

/**
 * @author TrungNguyen
 * @created 4/21/2026
 * @description
 */

@Data
public class LoginRequest {
    private String email;
    private String otp;

}
