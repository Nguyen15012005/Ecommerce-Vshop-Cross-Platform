package iuh.fit.backend.request;

import lombok.Data;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
@Data
public class CreateReviewRequest {
    private String reviewText;
    private double reviewRating;
    private List<String> productImage;
}
