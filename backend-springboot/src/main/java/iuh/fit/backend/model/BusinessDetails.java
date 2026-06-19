package iuh.fit.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author TrungNguyen
 * @created 4/11/2026
 * @description
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BusinessDetails {
    private String businessName;
    private String businessAddress;
    private String businessPhone;
    private String businessEmail;
    private String logo;
    private String banner;
}
