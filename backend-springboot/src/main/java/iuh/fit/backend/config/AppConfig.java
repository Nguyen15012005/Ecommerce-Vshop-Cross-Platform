package iuh.fit.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import org.jspecify.annotations.Nullable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

/**
 * @author TrungNguyen
 * Class cấu hình bảo mật cho toàn bộ ứng dụng
 */

@Configuration // Đánh dấu đây là class cấu hình Spring
@EnableWebSecurity // Bật hệ thống bảo mật Spring Security
public class AppConfig {

    @Bean // Tạo Bean để Spring quản lý
    SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {

        // Cấu hình session
        http.sessionManagement(management -> management.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS // Không dùng session (chuẩn JWT)
                ))

                // Cấu hình quyền truy cập API
                .authorizeHttpRequests(authorize -> authorize

                        // API review sản phẩm cho phép truy cập tự do
                        .requestMatchers("/api/products/*/reviews")
                        .permitAll()

                        // Những API bắt đầu bằng /api/** phải đăng nhập
                        .requestMatchers("/api/**")
                        .authenticated()

                        // Các request khác cho phép hết
                        .anyRequest()
                        .permitAll()
                )

                // Thêm filter JWT custom vào trước filter mặc định
                .addFilterBefore(
                        new JwtTokenVlidator(), // Filter kiểm tra token JWT
                        BasicAuthenticationFilter.class // Chạy trước filter này
                )

                // Tắt CSRF và cấu hình CORS
                .csrf(csrf -> csrf.disable() // Tắt CSRF (thường dùng cho API)
                        .cors(cors -> cors
                                .configurationSource(corsConfigurationSource()) // Dùng cấu hình CORS bên dưới
                        )
                );

        return http.build(); // Build thành SecurityFilterChain
    }

    // Method cấu hình CORS
    private CorsConfigurationSource corsConfigurationSource() {

        return new CorsConfigurationSource() {

            @Override
            public @Nullable CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                CorsConfiguration cfg = new CorsConfiguration(); // Tạo config CORS

                // Cho phép tất cả domain truy cập (frontend gọi API)
//                cfg.setAllowedOrigins(Collections.singletonList("*"));

                cfg.setAllowedOriginPatterns(Collections.singletonList("*"));
                // Cho phép tất cả method (GET, POST, PUT, DELETE...)
                cfg.setAllowedMethods(Collections.singletonList("*"));

                // Cho phép tất cả header
                cfg.setAllowedHeaders(Collections.singletonList("*"));

                // Cho phép gửi cookie / credentials
                cfg.setAllowCredentials(true);

                // Cho phép frontend đọc header trả về
                cfg.setExposedHeaders(Collections.singletonList("*"));

                // Cache cấu hình CORS trong 3600 giây (1 giờ)
                cfg.setMaxAge(3600L);

                return cfg; // Trả về cấu hình
            }
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Bean mã hóa mật khẩu bằng thuật toán BCrypt
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate(); // Bean để gọi API từ ứng dụng khác (nếu cần)
    }
}
