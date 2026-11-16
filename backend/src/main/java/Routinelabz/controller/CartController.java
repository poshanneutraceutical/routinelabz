package Routinelabz.controller;



import Routinelabz.dto.AddToCartRequest;
import Routinelabz.dto.CartDTO;
import Routinelabz.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;


    @PostMapping("/add")
    public CartDTO addToCart(
            @Valid @RequestBody AddToCartRequest request
    ) {
        return cartService.addToCart(request);
    }


    @GetMapping("/{customerId}")
    public CartDTO getCart(
            @PathVariable String customerId
    ) {
        return cartService.getCart(customerId);
    }


    @PutMapping("/{customerId}/{productId}")
    public CartDTO updateQuantity(
            @PathVariable String customerId,
            @PathVariable Long productId,
            @RequestParam Integer quantity
    ) {
        return cartService.updateQuantity(
                customerId,
                productId,
                quantity
        );
    }


    @DeleteMapping("/{customerId}/{productId}")
    public CartDTO removeFromCart(
            @PathVariable String customerId,
            @PathVariable Long productId
    ) {
        return cartService.removeFromCart(
                customerId,
                productId
        );
    }


    @DeleteMapping("/{customerId}/clear")
    public void clearCart(
            @PathVariable String customerId
    ) {
        cartService.clearCart(customerId);
    }
}
