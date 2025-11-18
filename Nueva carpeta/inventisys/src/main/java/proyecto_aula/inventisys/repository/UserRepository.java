package proyecto_aula.inventisys.repository;


import proyecto_aula.inventisys.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
