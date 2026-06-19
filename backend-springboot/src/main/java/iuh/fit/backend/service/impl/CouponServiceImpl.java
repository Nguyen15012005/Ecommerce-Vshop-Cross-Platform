package iuh.fit.backend.service.impl;

import iuh.fit.backend.model.Cart;
import iuh.fit.backend.model.Coupon;
import iuh.fit.backend.model.User;
import iuh.fit.backend.repository.CartRepository;
import iuh.fit.backend.repository.CouponRepository;
import iuh.fit.backend.repository.UserRepository;
import iuh.fit.backend.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {

        Coupon coupon = couponRepository.findByCode(code);
        Cart cart = cartRepository.findByUserId(user.getId());

        if (coupon==null)
            throw new Exception("Coupon not found");
        if (user.getUsedCoupons().contains(coupon))
            throw new Exception("Coupon already used");
        if (orderValue <= coupon.getMinimumOrderValue())
            throw new Exception("Order value does not meet the minimum requirement for this coupon" +coupon.getMinimumOrderValue());
        if (coupon.isActive()
                && LocalDate.now().isAfter(coupon.getValidityStartDate())
                && LocalDate.now().isBefore(coupon.getValidityEndDate())
        )
        {
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountedPrice = cart.getTotalSellingPrice()*coupon.getDiscountPercentage()/100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice()-discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);
            return cart;
        }

        throw new Exception("Coupon is not valid");
    }

    @Override
    public Cart deleteCouponfromCart(String code, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);

        if (coupon == null)
            throw new Exception("Coupon not found");

        Cart cart = cartRepository.findByUserId(user.getId());
        double discountedPrice = cart.getTotalSellingPrice()*coupon.getDiscountPercentage()/100;
        cart.setTotalSellingPrice(cart.getTotalSellingPrice()+discountedPrice);
        cart.setCouponCode(null);
        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id).orElseThrow(()-> new Exception("Coupon not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupon() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('Admin')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}





















