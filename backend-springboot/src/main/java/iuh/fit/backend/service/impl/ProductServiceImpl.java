package iuh.fit.backend.service.impl;

import iuh.fit.backend.exception.ProductException;
import iuh.fit.backend.model.Category;
import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.repository.CategoryRepository;
import iuh.fit.backend.repository.ProductRepository;
import iuh.fit.backend.request.CreateProductRequest;
import iuh.fit.backend.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/29/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest req, Seller seller) {
        Category category1 = categoryRepository.findByCategoryId(req.getCategory());

        if (category1 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);
            category1 = categoryRepository.save(category);
        }

        Category category2 = categoryRepository.findByCategoryId(req.getCategory2());
        if (category2 == null){
            Category category = new Category();
            category.setCategoryId(req.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }

        Category category3 = categoryRepository.findByCategoryId(req.getCategory3());
        if (category3 == null){
            Category category = new Category();
            category.setCategoryId(req.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        int discountPercentage = caculatorDiscountPercentage(req.getMrpPrice(), req.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setSellingPrice(req.getSellingPrice());
        product.setQuantity(req.getQuantity());
        product.setImages(req.getImages());
        product.setMrpPrice(req.getMrpPrice());
        product.setSizes(req.getSize());
        product.setDiscountPercent(discountPercentage);

        return productRepository.save(product);
    }

    private int caculatorDiscountPercentage(int mrpPrice, int sellingPrice) {
        if(mrpPrice <= 0){
            throw new IllegalArgumentException("MRP price must be greater than 0");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(Long productId, Product product) throws ProductException {
        Product existingProduct = findProductById(productId);

        existingProduct.setTitle(product.getTitle());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setMrpPrice(product.getMrpPrice());
        existingProduct.setSellingPrice(product.getSellingPrice());
        existingProduct.setDiscountPercent(caculatorDiscountPercentage(product.getMrpPrice(), product.getSellingPrice()));
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setColor(product.getColor());
        existingProduct.setImages(product.getImages());
        existingProduct.setSizes(product.getSizes());

        return productRepository.save(existingProduct);
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {
        return productRepository.findById(productId).orElseThrow(()-> new ProductException("Product not found with id: " + productId));
    }

    @Override
    public List<Product> searchProduct(String query) {
        return productRepository.searchProduct(query);
    }

    @Override
    public Page<Product> getAllProduct(String keyword, String category, String brand, String colors, String sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber) {
        Specification<Product> specification = (root, criteriaQuery, criteriaBuilder)->{
            List<Predicate> predicates = new ArrayList<>();
            if (keyword != null && !keyword.isBlank()) {
                Join<Product, Category> categoryJoin = root.join("category", JoinType.LEFT);
                String pattern = "%" + keyword.toLowerCase() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), pattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), pattern),
                        criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("categoryId")), pattern)
                ));
            }
            if (category != null && !category.isBlank()){
                Join<Product, Category> categoryJoin = root.join("category", JoinType.LEFT);
                Join<Category, Category> parentCategoryJoin = categoryJoin.join("parentCategory", JoinType.LEFT);
                Join<Category, Category> rootCategoryJoin = parentCategoryJoin.join("parentCategory", JoinType.LEFT);
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.equal(categoryJoin.get("categoryId"), category),
                        criteriaBuilder.equal(parentCategoryJoin.get("categoryId"), category),
                        criteriaBuilder.equal(rootCategoryJoin.get("categoryId"), category)
                ));
            }
            if (colors != null && !colors.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("color"), colors));
            }
            if (sizes != null && !sizes.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("sizes"), "%" + sizes + "%"));
            }
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }
            if (minDiscount != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount));
            }
            if (stock != null && !stock.isBlank()) {
                if ("in_stock".equals(stock)) {
                    predicates.add(criteriaBuilder.greaterThan(root.get("quantity"), 0));
                } else if ("out_of_stock".equals(stock)) {
                    predicates.add(criteriaBuilder.equal(root.get("quantity"), 0));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable;
        if (sort != null && !sort.isEmpty()){
             pageable = switch (sort) {
                case "price_low" ->
                        PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").ascending());
                case "price_high" ->
                        PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
            };
        }

        else {
            pageable= PageRequest.of(pageNumber!=null? pageNumber:0, 10, Sort.unsorted());
        }
        return productRepository.findAll(specification,pageable);
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }
}



























