package iuh.fit.backend.repository;

import iuh.fit.backend.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface DealRepository extends JpaRepository<Deal, Long> {
}
