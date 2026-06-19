package iuh.fit.backend.repository;

import iuh.fit.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/19/2026
 * @description
 */
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserId(Long id);
}
