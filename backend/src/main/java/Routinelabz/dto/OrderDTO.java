package Routinelabz.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long id;

    private String customerName;
    private String email;
    private String phone;


    private String address;
    private String city;
    private String state;
    private String pincode;


    private BigDecimal totalAmount;
    private String paymentStatus;
    private String orderStatus;
    private LocalDateTime orderDate;


    private List<Routinelabz.dto.OrderItemDTO> items;
}