package proyecto_aula.inventisys.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import proyecto_aula.inventisys.dto.AddItemRequest;
import proyecto_aula.inventisys.dto.UpdateItemRequest;
import proyecto_aula.inventisys.model.Cart;
import proyecto_aula.inventisys.model.Purchase;
import proyecto_aula.inventisys.service.CartService;
import proyecto_aula.inventisys.service.PurchaseService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost", "http://localhost:5173"})
public class CartController {

    private final CartService cartService;
    private final PurchaseService purchaseService;

    private String getCurrentCorreo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    @GetMapping
    public Cart getCart() {
        return cartService.getCartForUser(getCurrentUsername());
    }

    @PostMapping("/items")
    public Cart addItem(@RequestBody AddItemRequest req) {
        return cartService.addItem(getCurrentUsername(), req.getProductId(), req.getQuantity());
    }

    @PutMapping("/items/{productId}")
    public Cart updateItem(@PathVariable String productId, @RequestBody UpdateItemRequest req) {
        return cartService.updateItem(getCurrentUsername(), productId, req.getQuantity());
    }

    @DeleteMapping("/items/{productId}")
    public Cart removeItem(@PathVariable String productId) {
        return cartService.removeItem(getCurrentUsername(), productId);
    }

    @DeleteMapping
    public void clearCart() {
        cartService.clearCart(getCurrentUsername());
    }


    @PostMapping("/checkout")
    public List<Purchase> checkout() {
        String correo = getCurrentCorreo();
        return purchaseService.checkoutCart(correo);
    }
}
