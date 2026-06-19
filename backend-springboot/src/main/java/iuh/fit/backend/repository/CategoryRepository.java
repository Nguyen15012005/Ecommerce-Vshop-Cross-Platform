package iuh.fit.backend.repository;

import iuh.fit.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TrungNguyen
 * @created 4/29/2026
 * @description
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryId(String categoryId);
}
