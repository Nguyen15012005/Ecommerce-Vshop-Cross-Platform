package iuh.fit.backend.repository;

import iuh.fit.backend.model.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
    SellerReport findBySellerId(Long sellerId);
}
