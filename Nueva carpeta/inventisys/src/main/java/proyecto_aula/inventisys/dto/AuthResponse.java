package proyecto_aula.inventisys.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String correo;
    private String nombre;
}
