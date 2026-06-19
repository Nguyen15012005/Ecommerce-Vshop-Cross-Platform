package iuh.fit.backend.controller;

import iuh.fit.backend.config.JwtProvider;
import iuh.fit.backend.domain.AccountStatus;
import iuh.fit.backend.domain.UserRole;
import iuh.fit.backend.exception.SellerException;
import iuh.fit.backend.model.Seller;
import iuh.fit.backend.model.SellerReport;
import iuh.fit.backend.model.VerificationCode;
import iuh.fit.backend.repository.VerificationCodeRepository;
import iuh.fit.backend.request.LoginRequest;
import iuh.fit.backend.response.AuthResponse;
import iuh.fit.backend.service.AuthService;
import iuh.fit.backend.service.EmailService;
import iuh.fit.backend.service.SellerReportService;
import iuh.fit.backend.service.SellerService;
import iuh.fit.backend.util.OtpUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author TrungNguyen
 * @created 4/26/2026
 * @description
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {
    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;
    private final SellerReportService sellerReportService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws Exception {
       String otp = req.getOtp();
       String email = req.getEmail();

       req.setEmail("seller_"+email);
       System.out.println(otp + " - " + email);
       AuthResponse authResponse = authService.signing(req);
       return ResponseEntity.ok(authResponse);
   }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception{
        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);
        if (verificationCode == null || !verificationCode.getOtp().equals(otp)){
            throw new Exception("Wrong otp...");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);

        return new ResponseEntity<>(seller, HttpStatus.OK);
   }

    @PostMapping()
    public ResponseEntity<AuthResponse> createSeller(@RequestBody Seller seller) throws Exception {
        String otp = seller.getPassword();

        List<VerificationCode> verificationCodes = verificationCodeRepository.findByEmail(seller.getEmail());
        if (verificationCodes == null || verificationCodes.isEmpty() || !verificationCodes.get(0).getOtp().equals(otp)){
            throw new Exception("Wrong otp...");
        }

        Seller newSeller = sellerService.createSeller(seller);
        newSeller = sellerService.verifyEmail(newSeller.getEmail(), otp);

        // Auto login
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                newSeller.getEmail(), null, Collections.singletonList(new SimpleGrantedAuthority(UserRole.SELLER.toString())));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register success");
        authResponse.setRole(UserRole.SELLER);

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws SellerException {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
        Seller seller = sellerService.getSellerProfile(jwt);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception{
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport sellerReport = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(sellerReport, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Seller>> getAllSellers(@RequestParam(required = false) AccountStatus status) {
        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping
    public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller) throws Exception{
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception{
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

}
