package iuh.fit.backend.service.impl;

import iuh.fit.backend.model.Seller;
import iuh.fit.backend.model.SellerReport;
import iuh.fit.backend.repository.SellerReportRepository;
import iuh.fit.backend.service.SellerReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

    private final SellerReportRepository sellerReportRepository;

    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport sellerReport = sellerReportRepository.findBySellerId(seller.getId());

        if (sellerReport == null){
            SellerReport newReport = new SellerReport();
            newReport.setSeller(seller);
            return sellerReportRepository.save(newReport);
        }

        return sellerReport;
    }

    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {
        return sellerReportRepository.save(sellerReport);
    }
}



















