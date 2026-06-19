package iuh.fit.backend.repository;

import iuh.fit.backend.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Coupon findByCode(String code);
}
