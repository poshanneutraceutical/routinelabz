package Routinelabz.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .cors(cors -> {
                })


                .csrf(csrf -> csrf.disable())


                .authorizeHttpRequests(auth -> auth


                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()


                        .requestMatchers("/api/products/**")
                        .permitAll()


                        .requestMatchers("/api/cart/**")
                        .permitAll()


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/distributor"
                        )
                        .permitAll()


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/contact"
                        )
                        .permitAll()


                        .requestMatchers("/api/auth/**")
                        .permitAll()


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/orders/checkout"
                        )
                        .permitAll()



                        .requestMatchers(
                                "/",
                                "/error",
                                "/favicon.ico",
                                "/assets/**"
                        )
                        .permitAll()


                        .anyRequest()
                        .authenticated()
                )


                .formLogin(form -> form.disable())


                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
