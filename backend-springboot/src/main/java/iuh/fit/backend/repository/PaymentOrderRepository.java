package iuh.fit.backend.repository;

import iuh.fit.backend.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
    PaymentOrder findByPaymentLinkId(String paymentLinkId);
}
