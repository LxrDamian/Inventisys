package proyecto_aula.inventisys.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import proyecto_aula.inventisys.config.JwtTokenProvider;
import proyecto_aula.inventisys.dto.AuthResponse;
import proyecto_aula.inventisys.dto.LoginRequest;
import proyecto_aula.inventisys.dto.RegisterRequest;
import proyecto_aula.inventisys.model.User;
import proyecto_aula.inventisys.service.UserService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getPassword())
        );

        String token = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(token, request.getCorreo(), authentication.getName()));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        User user = userService.registerUser(request.getNombre(), request.getCorreo(), request.getPassword());
        return ResponseEntity.ok("Usuario registrado exitosamente");
    }
}
