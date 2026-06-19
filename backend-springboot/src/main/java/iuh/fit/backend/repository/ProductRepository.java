package iuh.fit.backend.repository;

import iuh.fit.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/29/2026
 * @description
 */
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    List<Product> findBySellerId(Long sellerId);

    @Query("SELECT p FROM Product p where (:query is null or lower(p.title)" +
            " LIKE lower(concat('%', :query, '%') ) ) " +
            "or (:query is null or lower(p.category.categoryId)" +
            " LIKE lower(concat('%', :query, '%') ) )")
    List<Product> searchProduct(@Param("query") String query);
}
