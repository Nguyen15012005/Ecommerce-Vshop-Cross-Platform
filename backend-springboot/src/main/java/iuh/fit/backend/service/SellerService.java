package iuh.fit.backend.service;

import iuh.fit.backend.domain.AccountStatus;
import iuh.fit.backend.exception.SellerException;
import iuh.fit.backend.model.Seller;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 4/21/2026
 * @description
 */
public interface SellerService {
    Seller getSellerProfile(String seller) throws Exception;
    Seller createSeller(Seller seller) throws Exception;
    Seller getSellerByEmail(String email) throws Exception;
    Seller getSellerById(Long id) throws SellerException;
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSeller(Long id, Seller seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    Seller verifyEmail(String email, String otp) throws Exception;
    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception;
}
