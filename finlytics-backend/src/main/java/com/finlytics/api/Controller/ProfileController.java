package com.finlytics.api.Controller;

import com.finlytics.api.DTO.AuthDTO;
import com.finlytics.api.DTO.ProfileDTO;
import com.finlytics.api.Service.ProfileService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO) throws MessagingException {
        ProfileDTO newProfile = profileService.registerProfile ( profileDTO );
        return ResponseEntity.status ( HttpStatus.CREATED ).body ( newProfile );
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {
        boolean isActivated = profileService.activateProfile ( token );
        if (isActivated) {
            return ResponseEntity.ok ( "Profile Activated Successfully" );
        } else {
            return ResponseEntity.status ( HttpStatus.BAD_REQUEST ).body ( "Invalid Activation Token" );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            if (!profileService.isAccountActive ( authDTO.getEmail ( ) )) {
                return ResponseEntity.status ( HttpStatus.FORBIDDEN ).body ( Map.of (
                        "message" , "Account is not activated. Please activate your account." ,
                        "status" , HttpStatus.FORBIDDEN.value ( )
                ) );
            }
            Map<String, Object> response = profileService.authenticateAndGenerateToken ( authDTO );
            return ResponseEntity.ok ( response );
        } catch (Exception e) {
            return ResponseEntity.status ( HttpStatus.BAD_REQUEST ).body ( Map.of (
                    "message" , "Invalid email or password." ,
                    "status" , HttpStatus.BAD_REQUEST.value ( )
            ) );
        }
    }
}
