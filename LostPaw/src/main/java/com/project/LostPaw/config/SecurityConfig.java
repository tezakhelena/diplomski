package com.project.LostPaw.config;

import com.project.LostPaw.service.impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            UserDetailsServiceImpl userDetailsService,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {}).sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ).authorizeHttpRequests(auth -> auth.requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**").permitAll()

                        // Registracija, prijava i potvrda e-maila
                        .requestMatchers(
                                "/api/users/verify",
                                "/api/pet_ads",
                                "/api/pet_ads/details",
                                "/api/pet_ads/details/*",
                                "/api/pet_ads/latest",
                                "/api/pet_ads/counts-by-species",
                                "/api/application/**",
                                "/api/attribute/**",
                                "/api/users/*",
                                "/api/comments/*"
                        ).permitAll()
                        // Javno dostupne slike i dokumenti
                        .requestMatchers(
                                "/images/**",
                                "/contracts/**"
                        ).permitAll()
                        // WebSocket povezivanje
                        .requestMatchers(
                                "/ws/**"
                        ).permitAll()
                        // Sve ostalo zahtijeva valjani JWT
                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(
            HttpSecurity http
    ) throws Exception {

        AuthenticationManagerBuilder builder =
                http.getSharedObject(
                        AuthenticationManagerBuilder.class
                );

        builder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());

        return builder.build();
    }
}