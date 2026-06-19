package iuh.fit.backend.controller;

import iuh.fit.backend.model.*;
import iuh.fit.backend.response.ApiResponse;
import iuh.fit.backend.response.PaymentLinkResponse;
import iuh.fit.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerService sellerService;
    private final OrderService orderService;
    private final SellerReportService sellerReportService;
    private final TransactionService transactionService;

    @GetMapping("/api/payment/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId,
                                                             @RequestParam String paymentLinkId,
                                                             @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        PaymentLinkResponse paymentResponse;

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        Boolean paymentSuccess = paymentService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);
        if (paymentSuccess){
            for (Order order: paymentOrder.getOrders()){
                transactionService.createTransaction(order);
                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport sellerReport = sellerReportService.getSellerReport(seller);
                sellerReport.setTotalOrders(sellerReport.getTotalOrders()+1);
                sellerReport.setTotalEarnings(sellerReport.getTotalEarnings()+order.getTotalSellingPrice());
                sellerReport.setTotalSales(sellerReport.getTotalSales()+order.getOrderItems().size());
                sellerReportService.updateSellerReport(sellerReport);
            }
        }
        ApiResponse res = new ApiResponse();
        res.setMessage("Payment successful");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
