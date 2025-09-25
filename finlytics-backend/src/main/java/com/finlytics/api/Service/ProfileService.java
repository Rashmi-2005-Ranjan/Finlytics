package com.finlytics.api.Service;

import com.finlytics.api.DTO.AuthDTO;
import com.finlytics.api.DTO.ProfileDTO;
import com.finlytics.api.Entity.ProfileEntity;
import com.finlytics.api.Repository.ProfileRepository;
import com.finlytics.api.Util.JwtUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public ProfileDTO registerProfile(ProfileDTO profileDTO) throws MessagingException {
        ProfileEntity newProfile = convertToEntity ( profileDTO );
        newProfile.setActivationToken ( UUID.randomUUID ( ).toString ( ) );
        newProfile = profileRepository.save ( newProfile );
        //Send Activation Email Here
        String activationLink = "http://localhost:8080/api/v1.0/activate?token=" + newProfile.getActivationToken ( );
        System.out.println ( "Activation Token: " + newProfile.getActivationToken ( ) );
        String subject = "Activate Your Finlytics Account";
        String body = "Click On The Following Link To Activate Your Account: " + activationLink;
        emailService.sendEmail ( newProfile.getEmail ( ) , subject , body );
        return convertToDTO ( newProfile );
    }

    public boolean activateProfile(String token) {
        System.out.println ( token );
        return profileRepository.findByActivationToken ( token )
                .map ( profile -> {
                    profile.setIsActive ( true );
                    profileRepository.save ( profile );
                    return true;
                } ).orElse ( false );
    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail ( email )
                .map ( ProfileEntity::getIsActive )
                .orElse ( false );
    }

    //Get Current Logged In User Profile From Security Context
    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext ( ).getAuthentication ( );
        return profileRepository.findByEmail ( authentication.getName ( ) )
                .orElseThrow ( () -> new UsernameNotFoundException ( "Profile Not Found With This Email: " + authentication.getName ( ) ) );
    }

    public ProfileDTO getPublicProfile(String email) {
        ProfileEntity currentUser = null;
        if (email == null) {
            currentUser = getCurrentProfile ( );
        } else {
            currentUser = profileRepository.findByEmail ( email )
                    .orElseThrow ( () -> new UsernameNotFoundException ( "Profile Not Found With This Email: " + email ) );
        }
        return convertToDTO ( currentUser );
    }

    private ProfileEntity convertToEntity(ProfileDTO profileDTO) {
        return ProfileEntity.builder ( )
                .id ( profileDTO.getId ( ) )
                .fullName ( profileDTO.getFullName ( ) )
                .email ( profileDTO.getEmail ( ) )
                .password ( passwordEncoder.encode ( profileDTO.getPassword ( ) ) )
                .profileImageUrl ( profileDTO.getProfileImageUrl ( ) )
                .createdAt ( profileDTO.getCreatedAt ( ) )
                .updatedAt ( profileDTO.getUpdatedAt ( ) )
                .build ( );
    }

    private ProfileDTO convertToDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder ( )
                .id ( profileEntity.getId ( ) )
                .fullName ( profileEntity.getFullName ( ) )
                .email ( profileEntity.getEmail ( ) )
                .profileImageUrl ( profileEntity.getProfileImageUrl ( ) )
                .createdAt ( profileEntity.getCreatedAt ( ) )
                .updatedAt ( profileEntity.getUpdatedAt ( ) )
                .build ( );
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try {
            authenticationManager.authenticate ( new UsernamePasswordAuthenticationToken ( authDTO.getEmail ( ) , authDTO.getPassword ( ) ) );
            //Generate The JWT Token Here
            String token = jwtUtil.generateToken ( authDTO.getEmail ( ) );
            return Map.of (
                    "token" , token ,
                    "user" , getPublicProfile ( authDTO.getEmail ( ) )
            );
        } catch (Exception e) {
            throw new RuntimeException ( "Invalid Email Or Password" );
        }
    }
}
