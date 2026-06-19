package iuh.fit.backend.service;

import iuh.fit.backend.model.HomeCategory;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface HomeCategoryService {
    HomeCategory createHomeCategory(HomeCategory homeCategory);
    List<HomeCategory> createCategories(List<HomeCategory> homeCategories);
    HomeCategory updateHomeCategory(Long id, HomeCategory homeCategory);
    List<HomeCategory> getAllHomeCategories();
}
