package Routinelabz.service;



import Routinelabz.dto.AddToCartRequest;
import Routinelabz.dto.CartDTO;
import Routinelabz.dto.CartDTO;
import Routinelabz.dto.CartItemDTO;
import Routinelabz.entity.Cart;
import Routinelabz.entity.CartItem;
import Routinelabz.entity.Product;
import Routinelabz.repository.CartRepository;
import Routinelabz.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;


    public CartDTO addToCart(
            AddToCartRequest request
    ) {

        if (request.getQuantity() == null ||
                request.getQuantity() <= 0) {

            throw new IllegalArgumentException(
                    "Quantity must be greater than 0"
            );
        }


        Product product =
                productRepository.findById(
                        request.getProductId()
                ).orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product not found: "
                                        + request.getProductId()
                        )
                );


        Cart cart =
                cartRepository
                        .findByCustomerId(
                                request.getCustomerId()
                        )
                        .orElseGet(() -> {

                            Cart newCart =
                                    Cart.builder()
                                            .customerId(
                                                    request.getCustomerId()
                                            )
                                            .items(
                                                    new ArrayList<>()
                                            )
                                            .totalAmount(
                                                    BigDecimal.ZERO
                                            )
                                            .build();

                            return cartRepository.save(
                                    newCart
                            );
                        });


        CartItem existingItem =
                cart.getItems()
                        .stream()
                        .filter(item ->
                                item.getProduct()
                                        .getId()
                                        .equals(
                                                product.getId()
                                        )
                        )
                        .findFirst()
                        .orElse(null);

        if (existingItem != null) {

            int newQuantity =
                    existingItem.getQuantity()
                            + request.getQuantity();

            existingItem.setQuantity(
                    newQuantity
            );

            existingItem.setSubtotal(
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            newQuantity
                                    )
                            )
            );

        } else {


            CartItem item =
                    CartItem.builder()
                            .cart(cart)
                            .product(product)
                            .quantity(
                                    request.getQuantity()
                            )
                            .subtotal(
                                    product.getPrice()
                                            .multiply(
                                                    BigDecimal.valueOf(
                                                            request.getQuantity()
                                                    )
                                            )
                            )
                            .build();

            cart.getItems().add(item);
        }

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    public CartDTO getCart(
            String customerId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElseGet(() ->

                                Cart.builder()
                                        .customerId(customerId)
                                        .items(
                                                new ArrayList<>()
                                        )
                                        .totalAmount(
                                                BigDecimal.ZERO
                                        )
                                        .build()
                        );

        return convertToDTO(cart);
    }

    public CartDTO removeFromCart(
            String customerId,
            Long productId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );

        cart.getItems().removeIf(
                item ->
                        item.getProduct()
                                .getId()
                                .equals(productId)
        );

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }


    public CartDTO updateQuantity(
            String customerId,
            Long productId,
            Integer quantity
    ) {

        if (quantity == null ||
                quantity <= 0) {

            return removeFromCart(
                    customerId,
                    productId
            );
        }

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Cart not found"
                                )
                        );

        CartItem item =
                cart.getItems()
                        .stream()
                        .filter(
                                i ->
                                        i.getProduct()
                                                .getId()
                                                .equals(
                                                        productId
                                                )
                        )
                        .findFirst()
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Product not found in cart"
                                )
                        );

        item.setQuantity(quantity);

        item.setSubtotal(
                item.getProduct()
                        .getPrice()
                        .multiply(
                                BigDecimal.valueOf(
                                        quantity
                                )
                        )
        );

        calculateTotal(cart);

        cartRepository.save(cart);

        return convertToDTO(cart);
    }

    public void clearCart(
            String customerId
    ) {

        Cart cart =
                cartRepository
                        .findByCustomerId(customerId)
                        .orElse(null);

        if (cart == null) {
            return;
        }

        cart.getItems().clear();

        cart.setTotalAmount(
                BigDecimal.ZERO
        );

        cartRepository.save(cart);
    }

    private void calculateTotal(
            Cart cart
    ) {

        BigDecimal total =
                BigDecimal.ZERO;

        for (CartItem item :
                cart.getItems()) {

            if (item.getSubtotal() != null) {

                total =
                        total.add(
                                item.getSubtotal()
                        );
            }
        }

        cart.setTotalAmount(total);
    }

    private CartDTO convertToDTO(
            Cart cart
    ) {

        return CartDTO.builder()

                .id(cart.getId())

                .customerId(
                        cart.getCustomerId()
                )

                .totalAmount(
                        cart.getTotalAmount()
                )

                .items(
                        cart.getItems()
                                .stream()
                                .map(item ->

                                        CartItemDTO.builder()

                                                .productId(
                                                        item.getProduct()
                                                                .getId()
                                                )

                                                .productName(
                                                        item.getProduct()
                                                                .getName()
                                                )

                                                .price(
                                                        item.getProduct()
                                                                .getPrice()
                                                )

                                                .quantity(
                                                        item.getQuantity()
                                                )

                                                .subtotal(
                                                        item.getSubtotal()
                                                )

                                                .build()
                                )
                                .toList()
                )

                .build();
    }
}