package iuh.fit.backend.service;

import iuh.fit.backend.model.Seller;
import iuh.fit.backend.model.SellerReport;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
