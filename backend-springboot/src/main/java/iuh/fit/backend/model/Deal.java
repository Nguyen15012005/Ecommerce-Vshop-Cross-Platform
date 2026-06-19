package iuh.fit.backend.model;

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
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer discount;

    @OneToOne
    private HomeCategory category;
}
