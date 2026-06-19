package iuh.fit.backend.service;

import iuh.fit.backend.model.Cart;
import iuh.fit.backend.model.CartItem;
import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.User;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface CartService {
    public CartItem addCartItem(
            User user,
            Product product,
            String size,
            int quantity
    );

    public Cart findUserCart(User user);

}
