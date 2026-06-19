package iuh.fit.backend.request;

import lombok.Data;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/29/2026
 * @description
 */

@Data
public class CreateProductRequest {
    private String title;
    private String description;
    private int mrpPrice;
    private int sellingPrice;
    private int quantity;
    private String color;
    private List<String> images;
    private String category;
    private String category2;
    private String category3;
    private String size;

}
