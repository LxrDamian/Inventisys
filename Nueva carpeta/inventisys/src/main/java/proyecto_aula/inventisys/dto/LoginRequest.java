package proyecto_aula.inventisys.dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String correo;
    private String password;
}
