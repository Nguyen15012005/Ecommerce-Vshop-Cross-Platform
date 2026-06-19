package iuh.fit.backend.service;

import iuh.fit.backend.model.CartItem;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface CartItemService {
    CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception;
    void deleteCartItem(Long userId, Long cartItemId) throws Exception;
    CartItem findCartItemById(Long id) throws Exception;

}
