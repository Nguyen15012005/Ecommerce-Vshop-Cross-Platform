package iuh.fit.backend.request;

import lombok.Data;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */

@Data
public class AddItemRequest {
    private String size;
    private int quantity;
    private Long productId;

}
