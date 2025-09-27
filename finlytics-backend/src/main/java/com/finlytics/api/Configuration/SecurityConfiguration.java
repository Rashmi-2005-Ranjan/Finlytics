package com.finlytics.api.Configuration;

import com.finlytics.api.Security.JwtRequestFilter;
import com.finlytics.api.Service.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    // Define the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors ( Customizer.withDefaults ( ) )
                .csrf ( AbstractHttpConfigurer::disable )
                .sessionManagement ( session -> session.sessionCreationPolicy ( SessionCreationPolicy.STATELESS ) )
                .authorizeHttpRequests ( auth -> auth.requestMatchers ( "/health" , "/register" , "/register" , "/login" , "/activate" ).permitAll ( )
                        .anyRequest ( ).authenticated ( ) )
                .addFilterBefore ( jwtRequestFilter , UsernamePasswordAuthenticationFilter.class );
        return httpSecurity.build ( );
    }

    //Bean For Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder ( );
    }

    //Bean For CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration ( );
        configuration.setAllowedOriginPatterns ( List.of ( "*" ) );
        configuration.setAllowedMethods ( List.of ( "GET" , "POST" , "PUT" , "DELETE" , "OPTIONS" , "PATCH" ) );
        configuration.setAllowedHeaders ( List.of ( "Authorization" , "Content-Type" , "Accept" ) );
        configuration.setAllowCredentials ( true );
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource ( );
        source.registerCorsConfiguration ( "/**" , configuration );
        return source;
    }

    //AuthenticationManager Bean
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider ( );
        authenticationProvider.setUserDetailsService ( appUserDetailsService );
        authenticationProvider.setPasswordEncoder ( passwordEncoder ( ) );
        return new ProviderManager ( authenticationProvider );
    }
}
