package Routinelabz.service;



import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import Routinelabz.dto.CheckoutRequestDTO;
import Routinelabz.dto.OrderDTO;
import Routinelabz.dto.OrderItemDTO;
import Routinelabz.entity.Cart;
import Routinelabz.entity.CartItem;
import Routinelabz.entity.Order;
import Routinelabz.entity.OrderItem;
import Routinelabz.repository.CartRepository;
import Routinelabz.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final Routinelabz.service.EmailService emailService;


    public OrderDTO checkout(CheckoutRequestDTO request) {

        Cart cart = cartRepository.findByCustomerId(request.getCustomerId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .totalAmount(cart.getTotalAmount())
                .paymentStatus("PENDING")
                .orderStatus("PLACED")
                .orderDate(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();


        for (CartItem cartItem : cart.getItems()) {

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(cartItem.getProduct().getId())
                    .productName(cartItem.getProduct().getName())

                    .price(cartItem.getProduct().getPrice())
                    .quantity(cartItem.getQuantity())
                    .subtotal(cartItem.getSubtotal())
                    .build();

            order.getItems().add(orderItem);
        }


        Order savedOrder = orderRepository.save(order);

        try {
            emailService.sendOrderConfirmation(savedOrder);
        } catch (Exception e) {
            log.error("Failed to send order confirmation email.", e);
        }

        cart.getItems().clear();
        cart.setTotalAmount(BigDecimal.ZERO);
        cartRepository.save(cart);

        return convertToDTO(savedOrder);
    }


    private OrderDTO convertToDTO(Order order) {

        return OrderDTO.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .email(order.getEmail())
                .phone(order.getPhone())
                .address(order.getAddress())
                .city(order.getCity())
                .state(order.getState())
                .pincode(order.getPincode())
                .totalAmount(order.getTotalAmount())
                .paymentStatus(order.getPaymentStatus())
                .orderStatus(order.getOrderStatus())
                .orderDate(order.getOrderDate())
                .items(
                        order.getItems()
                                .stream()
                                .map(item -> OrderItemDTO.builder()
                                        .productId(item.getProductId())
                                        .productName(item.getProductName())
                                        .price(item.getPrice())
                                        .quantity(item.getQuantity())
                                        .subtotal(item.getSubtotal())
                                        .build())
                                .collect(Collectors.toList())
                )
                .build();
    }
}