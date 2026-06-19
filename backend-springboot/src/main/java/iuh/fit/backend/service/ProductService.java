package iuh.fit.backend.service;

import iuh.fit.backend.exception.ProductException;
import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/29/2026
 * @description
 */
public interface ProductService {
    public Product createProduct(CreateProductRequest req, Seller seller);
    public void deleteProduct(Long productId) throws ProductException;
    public Product updateProduct(Long productId, Product product) throws ProductException;
    Product findProductById(Long productId) throws ProductException;
    List<Product> searchProduct(String query);
    public Page<Product> getAllProduct(
            String query,
            String category,
            String brand,
            String colors,
            String sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber
    );
    List<Product> getProductBySellerId(Long sellerId);
}
