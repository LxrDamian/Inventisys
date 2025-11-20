package proyecto_aula.inventisys.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import proyecto_aula.inventisys.model.Role;
import proyecto_aula.inventisys.model.User;
import proyecto_aula.inventisys.repository.UserRepository;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByCorreo("admin@admin.com")) {
            User admin = new User();
            admin.setNombre("Administrador");
            admin.setCorreo("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));

            admin.setRoles(Set.of(Role.ADMIN, Role.USER));

            userRepository.save(admin);
            System.out.println("Usuario admin creado: admin@admin.com / admin123");
        }
    }
}
