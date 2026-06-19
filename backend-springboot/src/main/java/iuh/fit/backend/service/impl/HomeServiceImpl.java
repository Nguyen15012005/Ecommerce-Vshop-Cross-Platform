package iuh.fit.backend.service.impl;

import iuh.fit.backend.domain.HomeCategorySection;
import iuh.fit.backend.model.Deal;
import iuh.fit.backend.model.Home;
import iuh.fit.backend.model.HomeCategory;
import iuh.fit.backend.repository.DealRepository;
import iuh.fit.backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
    private final DealRepository dealRepository;

    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {
        List<HomeCategory> gridCategories = allCategories
                .stream()
                .filter(
                        category -> category.getSection() == HomeCategorySection.GRID)
                .collect(Collectors.toList());

        List<HomeCategory> shopByCategories = allCategories
                .stream()
                .filter(
                        category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> electricCategories = allCategories
                .stream()
                .filter(
                        category -> category.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> dealCategories = allCategories
                .stream()
                .filter(
                        category -> category.getSection() == HomeCategorySection.DEALS)
                .collect(Collectors.toList());

        List<Deal> createdDeals = new ArrayList<>();

        if (dealRepository.findAll().isEmpty()){
            List<Deal> deals = allCategories.stream()
                    .filter(category -> category.getSection() == HomeCategorySection.DEALS)
                    .map(category -> new Deal(null, 10, category))
                    .collect(Collectors.toList());
            createdDeals = dealRepository.saveAll(deals);
        }
        else createdDeals = dealRepository.findAll();

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeal(createdDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}






























