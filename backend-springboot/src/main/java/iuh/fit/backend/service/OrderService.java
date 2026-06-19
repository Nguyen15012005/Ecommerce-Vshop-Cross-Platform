package iuh.fit.backend.service;

import iuh.fit.backend.domain.OrderStatus;
import iuh.fit.backend.model.*;

import java.util.List;
import java.util.Set;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface OrderService {
    Set<Order> createOrder(User user, Address shippingAddress, Cart cart);
    Order findOrderById(Long id) throws Exception;
    List<Order> usersOrderHistory(Long userId);
    List<Order> sellersOrder(Long sellerId);
    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;
    Order cancelOrder(Long orderId, User user) throws Exception;
    OrderItem getOrderItemById(Long id) throws Exception;
}
