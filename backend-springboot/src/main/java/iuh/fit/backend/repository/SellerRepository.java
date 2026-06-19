package iuh.fit.backend.repository;

import iuh.fit.backend.domain.AccountStatus;
import iuh.fit.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/15/2026
 * @description
 */
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus status);

}
