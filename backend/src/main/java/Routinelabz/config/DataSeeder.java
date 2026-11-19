package Routinelabz.config;

import Routinelabz.entity.Product;
import Routinelabz.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@Slf4j
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {

        return args -> {

            if (repo.count() > 0) {
                log.info(
                        "Products already exist. Skipping initial Routine Labz seeding."
                );
                return;
            }

            List<Product> products = List.of(

                    // ESSENTIAL WHEY - CHOCOLATE
                    Product.builder()
                            .name("Essential Whey - Chocolate")
                            .price(new BigDecimal("1000.00"))
                            .description(
                                    "Essential Whey premium protein. Chocolate flavour. " +
                                            "24g protein, 8.5g EAA and 2.0g BCAA as shown " +
                                            "on the supplied pack artwork."
                            )
                            .category("Whey Protein")
                            .badge("CHOCOLATE")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    // LEAN MASS GAINER - CHOCOLATE
                    Product.builder()
                            .name("Lean Mass Gainer - Chocolate")
                            .price(new BigDecimal("1000.00"))
                            .description(
                                    "Lean Mass Gainer. Chocolate flavour. 50g protein, " +
                                            "3g healthy fats and 75g carbohydrates as shown " +
                                            "on the supplied pack artwork."
                            )
                            .category("Mass Gainer")
                            .badge("CHOCOLATE")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    // ESSENTIAL WHEY - KULFI
                    Product.builder()
                            .name("Essential Whey - Kulfi")
                            .price(new BigDecimal("1000.00"))
                            .description(
                                    "Essential Whey premium protein. Kulfi flavour. " +
                                            "24g protein, 8.5g EAA and 2.0g BCAA as shown " +
                                            "on the supplied pack artwork."
                            )
                            .category("Whey Protein")
                            .badge("KULFI")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    // LEAN MASS GAINER - KULFI
                    Product.builder()
                            .name("Lean Mass Gainer - Kulfi")
                            .price(new BigDecimal("1000.00"))
                            .description(
                                    "Lean Mass Gainer. Kulfi flavour. 50g protein, " +
                                            "3g healthy fats and 75g carbohydrates as shown " +
                                            "on the supplied pack artwork."
                            )
                            .category("Mass Gainer")
                            .badge("KULFI")
                            .featured(true)
                            .inStock(true)
                            .build()
            );

            repo.saveAll(products);

            log.info(
                    "Successfully seeded {} Routine Labz product variants.",
                    products.size()
            );
        };
    }
}