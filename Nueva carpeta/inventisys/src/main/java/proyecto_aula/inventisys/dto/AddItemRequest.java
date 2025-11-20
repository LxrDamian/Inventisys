package proyecto_aula.inventisys.dto;

import lombok.Data;

@Data
public class AddItemRequest {
    private String productId;
    private int quantity;
}
