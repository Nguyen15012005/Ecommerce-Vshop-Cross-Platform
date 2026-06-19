package iuh.fit.backend.service.impl;

import iuh.fit.backend.config.JwtProvider;
import iuh.fit.backend.model.User;
import iuh.fit.backend.repository.UserRepository;
import iuh.fit.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author TrungNguyen
 * @created 4/21/2026
 * @description
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;


    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = this.findUserByEmail(email);
        if (user == null){
            throw new Exception("User not found with provided email - " + email);
        }
        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new Exception("User not found with provided email - " + email);
        }
        return user;
    }
}
