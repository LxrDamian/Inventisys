package proyecto_aula.inventisys.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "purchases")
public class Purchase {
    @Id
    private String id;

    private String nombreCliente;
    private String correoCliente;
    private String productoNombre;
    private Integer cantidad;
    private Double precio;
    private Double total;
    private LocalDateTime fechaHora;
}
