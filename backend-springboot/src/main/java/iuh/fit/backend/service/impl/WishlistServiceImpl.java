package iuh.fit.backend.service.impl;

import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.User;
import iuh.fit.backend.model.Wishlist;
import iuh.fit.backend.repository.WishlistRepository;
import iuh.fit.backend.service.WishlistService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {
    private final WishlistRepository wishlistRepository;

    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishListByUserId(User user) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if (wishlist == null) {
            wishlist = createWishlist(user);
        }
        return wishlist;
    }

    @Override
    @Transactional
    public Wishlist addProductToWishlist(User user, Product product) {
        Wishlist wishlist = getWishListByUserId(user);
        boolean exists = wishlist.getProducts().stream()
                .anyMatch(item -> item.getId().equals(product.getId()));
        if(exists) {
            wishlist.getProducts().removeIf(item -> item.getId().equals(product.getId()));
        }
        else {
            wishlist.getProducts().add(product);
        }
        return wishlistRepository.save(wishlist);
    }
}
