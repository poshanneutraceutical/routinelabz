
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
                log.info("Products already exist. Skipping seeding.");
                return;
            }

            List<Product> products = List.of(

                    Product.builder()
                            .name("Mass Gainer")
                            .price(new BigDecimal("1000.00"))
                            .description(
                                    "A calorie-dense formula built around size, strength and consistent daily nutrition."
                            )
                            .category("Mass Gainer")
                            .badge("CHOCOLATE")
                            .featured(true)
                            .inStock(true)
                            .build(),

                    Product.builder()
                            .name("Lean Mass Gainer")
                            .price(new BigDecimal("1000.00"))
                            .description(
                                    "A leaner calorie profile designed for controlled mass building and sustained training fuel."
                            )
                            .category("Mass Gainer")
                            .badge("VANILLA")
                            .featured(true)
                            .inStock(true)
                            .build()
            );

            repo.saveAll(products);

            log.info("Successfully seeded {} Routine Labz products.",
                    products.size());
        };
    }
}
