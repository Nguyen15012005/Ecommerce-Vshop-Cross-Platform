package iuh.fit.backend.repository;

import iuh.fit.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/15/2026
 * @description
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
