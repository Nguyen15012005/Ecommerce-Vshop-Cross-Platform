package iuh.fit.backend.service;

import iuh.fit.backend.model.Product;
import iuh.fit.backend.model.Review;
import iuh.fit.backend.model.User;
import iuh.fit.backend.request.CreateReviewRequest;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface ReviewService {
    Review createReview(CreateReviewRequest req, User user, Product product);
    List<Review> getReviewsByProductId(Long productId);
    Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;
    void deleteReview(Long reviewId, Long userId) throws Exception;
    Review getReviewById(Long reviewId) throws Exception;
}
