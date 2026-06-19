package iuh.fit.backend.repository;

import iuh.fit.backend.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/21/2026
 * @description
 */
public interface AddressRepository extends JpaRepository<Address, Long> {
}
