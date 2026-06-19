package iuh.fit.backend.service.impl;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import iuh.fit.backend.domain.PaymentMethod;
import iuh.fit.backend.domain.PaymentOrderStatus;
import iuh.fit.backend.domain.PaymentStatus;
import iuh.fit.backend.model.Order;
import iuh.fit.backend.model.PaymentOrder;
import iuh.fit.backend.model.User;
import iuh.fit.backend.repository.OrderRepository;
import iuh.fit.backend.repository.PaymentOrderRepository;
import iuh.fit.backend.response.PaymentLinkResponse;
import iuh.fit.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * @author TrungNguyen
 * @created 4/30/2026
 * @description
 */

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

    private String apiKey="apikey";
    private String apiSecret="apisecret";
    private String stripeSecretKey="stripesecretkey";

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {
        Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId).orElseThrow(()-> new Exception("payment order not found"));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(orderId);
        if (paymentOrder == null) {
            throw new Exception("Payment order not found with provide payment link id");
        }
        return paymentOrder;
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentStatus.PENDING)){
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            Payment payment = razorpay.payments.fetch(paymentId);

            String status = payment.get("status");
            if (status.equals("captured")){
                Set<Order> orders = paymentOrder.getOrders();
                for (Order order: orders) {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                }
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
        return false;
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
        amount= amount*100;

        try{
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "VND");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "http://localhost:5173/payment-success" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkUrl = paymentLink.get("short_url");

            String paymentLinkId = paymentLink.get("id");

            return paymentLink;

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RazorpayException("Failed to create payment link: " + e.getMessage());
        }
    }

    @Override
    public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey= stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payment-success" + orderId)
                .setCancelUrl("http://localhost:5173/payment-cancel")
                .addLineItem(SessionCreateParams
                        .LineItem
                        .builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams
                                .LineItem
                                .PriceData
                                .builder()
                                .setCurrency("VNĐ")
                                .setUnitAmount(amount*100)
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Trung Nguyen payment")
                                        .build()
                                )
                                .build()
                        )
                        .build()
                )
                .build();
        Session session = Session.create(params);
        return session.getUrl();
    }

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders, PaymentMethod paymentMethod) {
        long amount = orders.stream()
                .mapToLong(order -> order.getTotalSellingPrice() != null ? order.getTotalSellingPrice() : 0L)
                .sum();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders != null ? orders : new HashSet<>());
        paymentOrder.setPaymentMethod(paymentMethod);

        // COD: tạo thành công ngay, còn online: pending
        if (paymentMethod == PaymentMethod.COD) {
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
        } else {
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentLinkId(String paymentLinkId) {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(paymentLinkId);
        if (paymentOrder == null) {
            throw new RuntimeException("Payment order not found with paymentLinkId: " + paymentLinkId);
        }
        return paymentOrder;
    }

    @Override
    public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) {
        if (paymentOrder == null) {
            return false;
        }

        // Chỉ xử lý khi đang pending
        if (!PaymentOrderStatus.PENDING.equals(paymentOrder.getStatus())) {
            return false;
        }

        // PaymentOrder hiện chưa có field paymentId, nên chỉ lưu paymentLinkId
        if (paymentLinkId != null && !paymentLinkId.isBlank()) {
            paymentOrder.setPaymentLinkId(paymentLinkId);
        }

        Set<Order> orders = paymentOrder.getOrders();
        if (orders != null) {
            for (Order order : orders) {
                order.setPaymentStatus(PaymentStatus.COMPLETED);
                orderRepository.save(order);
            }
        }

        paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
        paymentOrderRepository.save(paymentOrder);
        return true;
    }

    @Override
    public PaymentLinkResponse createPaymentLink(User user, Long amount, Long orderId, PaymentMethod paymentMethod) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

            Set<Order> orders = new HashSet<>();
            orders.add(order);

            PaymentOrder paymentOrder = createOrder(user, orders, paymentMethod);

            PaymentLinkResponse response = new PaymentLinkResponse();

            // COD không cần link thanh toán
            if (paymentMethod == PaymentMethod.COD) {
                response.payment_link_id = null;
                response.payment_link_url = null;
                return response;
            }

            String generatedPaymentLinkId = "PAY-" + UUID.randomUUID();

            String paymentUrl;
            if (paymentMethod == PaymentMethod.STRIPE) {
                paymentUrl = createStripePaymentLink(user, amount, orderId);
            } else {
                // Link trung gian cho các cổng VN (bạn thay bằng API thật của VNPay/MoMo/ZaloPay sau)
                paymentUrl = "http://localhost:5173/payment/checkout"
                        + "?method=" + paymentMethod
                        + "&paymentLinkId=" + generatedPaymentLinkId
                        + "&orderId=" + orderId
                        + "&amount=" + amount;
            }

            paymentOrder.setPaymentLinkId(generatedPaymentLinkId);
            paymentOrderRepository.save(paymentOrder);

            response.payment_link_id = generatedPaymentLinkId;
            response.payment_link_url = paymentUrl;
            return response;

        } catch (Exception e) {
            throw new RuntimeException("Failed to create payment link: " + e.getMessage(), e);
        }
    }

}
