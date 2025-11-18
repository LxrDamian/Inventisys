package proyecto_aula.inventisys.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String nombre;
    private String correo;
    private String password;
}
