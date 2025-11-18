package proyecto_aula.inventisys.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import proyecto_aula.inventisys.dto.PurchaseRequest;
import proyecto_aula.inventisys.model.Purchase;
import proyecto_aula.inventisys.service.PurchaseService;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<Purchase> createPurchase(@RequestBody PurchaseRequest request, Authentication auth) {
        String correo = auth.getName();
        Purchase purchase = purchaseService.createPurchase(correo, request.getProductId(), request.getCantidad());
        return ResponseEntity.ok(purchase);
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        return ResponseEntity.ok(purchaseService.getAllPurchases());
    }

    @GetMapping("/my-purchases")
    public ResponseEntity<List<Purchase>> getMyPurchases(Authentication auth) {
        String correo = auth.getName();
        return ResponseEntity.ok(purchaseService.getPurchasesByUser(correo));
    }
}

