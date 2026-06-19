package iuh.fit.backend.repository;

import iuh.fit.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySellerId(Long sellerId);

}
