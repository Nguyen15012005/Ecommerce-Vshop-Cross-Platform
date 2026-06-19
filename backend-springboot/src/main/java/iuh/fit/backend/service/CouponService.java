package iuh.fit.backend.service;

import iuh.fit.backend.model.Cart;
import iuh.fit.backend.model.Coupon;
import iuh.fit.backend.model.User;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface CouponService {
    Cart applyCoupon(String code, double orderValue, User user) throws Exception;
    Cart deleteCouponfromCart(String code,User user) throws Exception;
    Coupon findCouponById(Long id) throws Exception;
    Coupon createCoupon(Coupon coupon);
    List<Coupon> findAllCoupon();
    void deleteCoupon(Long id) throws Exception;
}
