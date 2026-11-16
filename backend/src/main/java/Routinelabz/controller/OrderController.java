package Routinelabz.controller;


import Routinelabz.dto.CheckoutRequestDTO;
import Routinelabz.dto.OrderDTO;
import Routinelabz.service.OrderService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public OrderDTO checkout(
            @Valid @RequestBody CheckoutRequestDTO request) {

        return orderService.checkout(request);
    }

}
