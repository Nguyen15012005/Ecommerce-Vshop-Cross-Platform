package iuh.fit.backend.service;

import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.User;
import iuh.fit.backend.model.Wishlist;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishListByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product);

}
