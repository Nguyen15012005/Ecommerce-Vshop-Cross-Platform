package iuh.fit.backend.service;


import iuh.fit.backend.model.User;

/**
 * @author TrungNguyen
 * @created 4/21/2026
 * @description
 */
public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String jwt) throws Exception;
}
