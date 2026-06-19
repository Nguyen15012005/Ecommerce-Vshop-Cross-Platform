package iuh.fit.backend.service;

import iuh.fit.backend.model.Home;
import iuh.fit.backend.model.HomeCategory;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface HomeService {
    Home createHomePageData(List<HomeCategory> allCategories);
}
