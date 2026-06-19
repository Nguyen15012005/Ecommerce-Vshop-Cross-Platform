package iuh.fit.backend.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import iuh.fit.backend.domain.PaymentMethod;
import iuh.fit.backend.model.Order;
import iuh.fit.backend.model.PaymentOrder;
import iuh.fit.backend.model.User;
import iuh.fit.backend.response.PaymentLinkResponse;

import java.util.Set;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */
public interface PaymentService {
    PaymentOrder createOrder(User user, Set<Order> orders);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;
    PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException;
    String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
    PaymentOrder createOrder(User user, Set<Order> orders, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderByPaymentLinkId(String paymentLinkId);
    Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId);
    PaymentLinkResponse createPaymentLink(User user, Long amount, Long orderId, PaymentMethod paymentMethod);
}
