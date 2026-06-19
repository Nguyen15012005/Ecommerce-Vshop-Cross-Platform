package iuh.fit.backend.controller;

import iuh.fit.backend.model.Home;
import iuh.fit.backend.model.HomeCategory;
import iuh.fit.backend.service.HomeCategoryService;
import iuh.fit.backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
@RequiredArgsConstructor
@RestController
//@RequestMapping("/api/home-categories")
public class HomeCategoryController {
    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/home-categories")
    public ResponseEntity<Home> createHomeCategories(@RequestBody List<HomeCategory> homeCategories) {
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);
        Home home = homeService.createHomePageData(categories);
        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() {
        List<HomeCategory> homeCategories = homeCategoryService.getAllHomeCategories();
        return ResponseEntity.ok(homeCategories);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(@PathVariable Long id, @RequestBody HomeCategory homeCategory) throws Exception {
        HomeCategory updateCategory = homeCategoryService.updateHomeCategory(id, homeCategory);
        return ResponseEntity.ok(updateCategory);
    }
}
