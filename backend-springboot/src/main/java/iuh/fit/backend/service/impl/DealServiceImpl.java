package iuh.fit.backend.service.impl;

import iuh.fit.backend.model.Deal;
import iuh.fit.backend.model.HomeCategory;
import iuh.fit.backend.repository.DealRepository;
import iuh.fit.backend.repository.HomeCategoryRepository;
import iuh.fit.backend.service.DealService;
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
public class DealServiceImpl implements DealService {
    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;
    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {
        HomeCategory homeCategory = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);
        Deal newDeal = dealRepository.save(deal);
        newDeal.setCategory(homeCategory);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.save(newDeal);
    }

    @Override
    public Deal updateDeal(Deal deal, Long id) throws Exception {
        Deal existingDeal = dealRepository.findById(id).orElse(null);
        HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if (existingDeal != null){
            if (deal.getDiscount()!=null)
                existingDeal.setDiscount(deal.getDiscount());
            if (category != null)
                existingDeal.setCategory(category);
            return dealRepository.save(existingDeal);
        }
        throw new Exception("Deal not found with id: " + id);

    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id).orElseThrow(()-> new Exception("Deal not found with id: " + id));
        dealRepository.delete(deal);
    }
}



















