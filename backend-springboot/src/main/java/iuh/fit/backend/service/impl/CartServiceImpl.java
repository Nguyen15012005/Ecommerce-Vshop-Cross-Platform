package iuh.fit.backend.service.impl;

import iuh.fit.backend.model.Cart;
import iuh.fit.backend.model.CartItem;
import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.User;
import iuh.fit.backend.repository.CartItemRepository;
import iuh.fit.backend.repository.CartRepository;
import iuh.fit.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;


    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);
        int itemQuantity = quantity > 0 ? quantity : 1;
        String itemSize = size != null && !size.isBlank() ? size : "FREE";
        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, itemSize);
        if(isPresent == null){
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(itemQuantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(itemSize);

            int totalPrice = itemQuantity * product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(itemQuantity * product.getMrpPrice());


            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);
        }
        isPresent.setQuantity(isPresent.getQuantity() + itemQuantity);
        isPresent.setSellingPrice(isPresent.getQuantity() * product.getSellingPrice());
        isPresent.setMrpPrice(isPresent.getQuantity() * product.getMrpPrice());
        return cartItemRepository.save(isPresent);

    }

    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart = cartRepository.save(cart);
        }
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem: cart.getCartItems()){
            totalPrice+=cartItem.getMrpPrice();
            totalDiscountedPrice+=cartItem.getSellingPrice();
            totalItem+=cartItem.getQuantity();
        }

        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(caculatorDiscountPercentage(totalPrice, totalDiscountedPrice));
        cart.setTotalItem(totalItem);
        return cart;
    }

    private int caculatorDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0){
            return 0;
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }
}



















