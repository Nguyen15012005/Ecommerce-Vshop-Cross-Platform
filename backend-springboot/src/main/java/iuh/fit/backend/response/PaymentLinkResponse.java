package iuh.fit.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentLinkResponse {
    public String payment_link_url;
    public String payment_link_id;
}
