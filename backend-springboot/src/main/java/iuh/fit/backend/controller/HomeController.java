package iuh.fit.backend.controller;

import iuh.fit.backend.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * @author TrungNguyen
 * @created 4/11/2026
 * @description
 */
@RestController
public class HomeController {

    @GetMapping
    public ApiResponse HomeControllerHandler(){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("hello");
        return apiResponse;
    }
}
