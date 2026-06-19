package iuh.fit.backend.repository;

import iuh.fit.backend.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/20/2026
 * @description
 */
import java.util.List;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    List<VerificationCode> findByEmail(String email);

    VerificationCode findByOtp(String otp);
}
