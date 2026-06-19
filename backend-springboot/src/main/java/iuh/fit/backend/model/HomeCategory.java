package iuh.fit.backend.model;

import iuh.fit.backend.domain.HomeCategorySection;
import jakarta.persistence.*;
import lombok.*;

/**
 * @author TrungNguyen
 * @created 4/11/2026
 * @description
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class HomeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String image;

    private String categoryId;

    @Enumerated(EnumType.STRING)
    private HomeCategorySection section;
}
