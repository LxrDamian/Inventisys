package proyecto_aula.inventisys.repository;

import proyecto_aula.inventisys.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}

