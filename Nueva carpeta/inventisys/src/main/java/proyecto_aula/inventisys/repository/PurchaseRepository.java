package proyecto_aula.inventisys.repository;


import proyecto_aula.inventisys.model.Purchase;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PurchaseRepository extends MongoRepository<Purchase, String> {
    List<Purchase> findByCorreoCliente(String correo);
}

