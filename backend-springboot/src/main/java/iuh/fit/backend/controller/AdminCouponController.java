package iuh.fit.backend.controller;

import iuh.fit.backend.model.Cart;
import iuh.fit.backend.model.Coupon;
import iuh.fit.backend.model.User;
import iuh.fit.backend.service.CartService;
import iuh.fit.backend.service.CouponService;
import iuh.fit.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class AdminCouponController {
    private final CouponService couponService;
    private final UserService userService;
    private final CartService cartService;

//    Customer apply coupon to cart
    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupon(@RequestParam String apply,
                                            @RequestParam String code,
                                            @RequestParam double orderValue,
                                            @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Cart cart;
        if (apply.equals("true"))
            cart = couponService.applyCoupon(code, orderValue, user);
        else
            cart = couponService.deleteCouponfromCart(code, user);

        return ResponseEntity.ok(cart);
    }

//    admin manage coupon
    @PostMapping("/admin/create")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon){
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception {
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted successfully");
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupon>> getAllCoupons(){
        List<Coupon> coupons = couponService.findAllCoupon();
        return ResponseEntity.ok(coupons);
    }
}
