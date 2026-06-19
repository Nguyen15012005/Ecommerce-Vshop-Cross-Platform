package iuh.fit.backend.repository;

import iuh.fit.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findBySellerId(Long sellerId);
}
