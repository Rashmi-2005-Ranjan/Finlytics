package com.finlytics.api.Service;

import com.finlytics.api.Entity.ProfileEntity;
import com.finlytics.api.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final ProfileRepository profileRepository;

    // Load user by email (username)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ProfileEntity existingProfile = profileRepository.findByEmail ( email )
                .orElseThrow ( () -> new UsernameNotFoundException ( "Profile Not Found With The Given Email: " + email ) );
        return User.builder ( )
                .username ( existingProfile.getEmail ( ) )
                .password ( existingProfile.getPassword ( ) )
                .authorities ( Collections.emptyList ( ) ) // No roles or authorities
                .build ( );
    }
}