package proyecto_aula.inventisys.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import proyecto_aula.inventisys.model.User;
import proyecto_aula.inventisys.repository.UserRepository;


import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String nombre, String correo, String password) {
        if (userRepository.existsByCorreo(correo)) {
            throw new RuntimeException("El correo ya está registrado");
        }

        User user = new User();
        user.setNombre(nombre);
        user.setCorreo(correo);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of("USER"));

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public User updateUser(String id, User user) {
        User existingUser = getUserById(id);
        existingUser.setNombre(user.getNombre());
        existingUser.setCorreo(user.getCorreo());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(existingUser);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
