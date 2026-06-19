package iuh.fit.backend.service.impl;

import iuh.fit.backend.model.HomeCategory;
import iuh.fit.backend.repository.HomeCategoryRepository;
import iuh.fit.backend.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
        if (homeCategoryRepository.findAll().isEmpty())
            return homeCategoryRepository.saveAll(homeCategories);
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(Long id, HomeCategory category) {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HomeCategory not found with id: " + id));
        if (category.getImage() != null) existingCategory.setImage(category.getImage());
        if (category.getCategoryId() != null) existingCategory.setCategoryId(category.getCategoryId());
        return homeCategoryRepository.save(existingCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
