package iuh.fit.backend.service.impl;

import iuh.fit.backend.config.JwtProvider;
import iuh.fit.backend.domain.UserRole;
import iuh.fit.backend.model.Cart;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.model.User;
import iuh.fit.backend.model.VerificationCode;
import iuh.fit.backend.repository.CartRepository;
import iuh.fit.backend.repository.SellerRepository;
import iuh.fit.backend.repository.UserRepository;
import iuh.fit.backend.repository.VerificationCodeRepository;
import iuh.fit.backend.request.LoginRequest;
import iuh.fit.backend.response.AuthResponse;
import iuh.fit.backend.response.SignupRequest;
import iuh.fit.backend.service.AuthService;
import iuh.fit.backend.service.EmailService;
import iuh.fit.backend.util.OtpUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/15/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;

    @Override
    public void sentLoginOtp(String email, UserRole role) throws Exception {
        String SIGNING_PREFIX = "signing_";

        if (email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());

            if (role.equals(UserRole.SELLER) ){
                Seller seller = sellerRepository.findByEmail(email);
                if (seller == null){
                    throw new Exception("Seller not found");
                }
            }
            else {
                System.out.println("Email: " + email);
                User user = userRepository.findByEmail(email);
                if(user==null){
                    throw new Exception("User not found with provided email");
                }
            }
        }

        List<VerificationCode> isExist = verificationCodeRepository.findByEmail(email);

        if (isExist != null && !isExist.isEmpty()){
            verificationCodeRepository.deleteAll(isExist);
        }

        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);

        verificationCodeRepository.save(verificationCode);
        String subject = "Daily Store login/signup OTP";
        String text = "Mã OTP để Đăng nhập/Đăng ký tài khoản của bạn (Your login/signup with otp): " + otp;

        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }

    @Override
    public String createUser(SignupRequest req) throws Exception {

        List<VerificationCode> verificationCodes = verificationCodeRepository.findByEmail(req.getEmail());
        if(verificationCodes == null || verificationCodes.isEmpty() || !verificationCodes.get(0).getOtp().equals(req.getOtp())){
            throw new Exception("Wrong otp");
        }

        User user = userRepository.findByEmail(req.getEmail());

        if (user == null) {
            User createdUser = new User();
            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(UserRole.CUSTOMER);
            createdUser.setPhone(req.getPhone() != null ? req.getPhone() : "");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

            user = userRepository.save(createdUser);

            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(UserRole.CUSTOMER.toString()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
        String username = req.getEmail();
        String otp = req.getOtp();

        Authentication authentication = authenticate(username, otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login success");
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        authResponse.setRole(UserRole.valueOf(roleName));
        return authResponse;
    }

    private Authentication authenticate(String username, String otp) throws Exception {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        String SELLER_PREFIX ="seller_";
        if(username.startsWith(SELLER_PREFIX)){
            username = username.substring(SELLER_PREFIX.length());
        }

        if(userDetails == null){
            throw new BadCredentialsException("Tên người dùng không hợp lệ (invalid username)");
        }

        List<VerificationCode> verificationCodes = verificationCodeRepository.findByEmail(username);
        if(verificationCodes == null || verificationCodes.isEmpty() || !verificationCodes.get(0).getOtp().equals(otp)){
            throw new Exception("Mã OTP không hợp lệ (invalid OTP)");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
