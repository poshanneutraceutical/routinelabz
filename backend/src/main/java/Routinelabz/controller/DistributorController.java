package Routinelabz.controller;


import Routinelabz.dto.DistributorInquiryDTO;
import Routinelabz.dto.DistributorInquiryDTO;
import Routinelabz.service.DistributorService;
import Routinelabz.service.DistributorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/distributor")
@RequiredArgsConstructor
public class DistributorController {

    private final DistributorService distributorService;

    @PostMapping
    public ResponseEntity<DistributorInquiryDTO> submitInquiry(@Valid @RequestBody DistributorInquiryDTO dto) {
        DistributorInquiryDTO saved = distributorService.submitInquiry(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}