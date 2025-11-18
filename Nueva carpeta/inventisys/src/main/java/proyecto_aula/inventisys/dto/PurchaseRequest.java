package proyecto_aula.inventisys.dto;

import lombok.Data;

@Data
public class PurchaseRequest {
    private String productId;
    private Integer cantidad;
}
