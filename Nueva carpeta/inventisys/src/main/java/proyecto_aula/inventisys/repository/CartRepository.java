package proyecto_aula.inventisys.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import proyecto_aula.inventisys.model.Cart;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {

    Optional<Cart> findByUserId(String userId);
}
