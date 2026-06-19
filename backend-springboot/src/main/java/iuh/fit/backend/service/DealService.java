package iuh.fit.backend.service;

import iuh.fit.backend.model.Deal;

import java.util.List;

/**
 * @author TrungNguyen
 * @created 5/1/2026
 * @description
 */
public interface DealService {
    List<Deal> getDeals();
    Deal createDeal(Deal deal);
    Deal updateDeal(Deal deal, Long id) throws Exception;
    void deleteDeal(Long id) throws Exception;
}
