package proyecto_aula.inventisys.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Set;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String nombre;

    @Indexed(unique = true)
    private String correo;

    private String password;

    private Set<String> roles;
}

