package iuh.fit.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author TrungNguyen
 * @created 4/29/2026
 * @description
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetails {
    private String error;
    private String details;
    private LocalDateTime timestamp;
}
