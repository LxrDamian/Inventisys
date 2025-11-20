package proyecto_aula.inventisys.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proyecto_aula.inventisys.model.Cart;
import proyecto_aula.inventisys.model.CartItem;
import proyecto_aula.inventisys.model.Product;
import proyecto_aula.inventisys.model.Purchase;
import proyecto_aula.inventisys.model.User;
import proyecto_aula.inventisys.repository.PurchaseRepository;
import proyecto_aula.inventisys.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ProductService productService;
    private final UserRepository userRepository;
    private final CartService cartService; // 👈 NUEVO: para leer/vaciar carrito

    /**
     * Compra de un solo producto (lo que ya tenías).
     */
    public Purchase createPurchase(String correoCliente, String productId, Integer cantidad) {
        User user = userRepository.findByCorreo(correoCliente)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Product product = productService.getProductById(productId);

        if (product.getCantidad() < cantidad) {
            throw new RuntimeException("Stock insuficiente");
        }

        Purchase purchase = new Purchase();
        purchase.setNombreCliente(user.getNombre());
        purchase.setCorreoCliente(user.getCorreo());
        purchase.setProductoNombre(product.getNombre());
        purchase.setCantidad(cantidad);
        purchase.setPrecio(product.getPrecio());
        purchase.setTotal(product.getPrecio() * cantidad);
        purchase.setFechaHora(LocalDateTime.now());

        // Descontar stock
        productService.updateStock(productId, cantidad);

        return purchaseRepository.save(purchase);
    }

    public List<Purchase> checkoutCart(String correoCliente) {
        // El CartService está diseñado para identificar al carrito por userId/correo
        Cart cart = cartService.getCartForUser(correoCliente);

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        List<Purchase> purchases = new ArrayList<>();

        for (CartItem item : cart.getItems()) {
            Purchase purchase = createPurchase(
                    correoCliente,
                    item.getProductId(),
                    item.getQuantity()
            );
            purchases.add(purchase);
        }

        cartService.clearCart(correoCliente);

        return purchases;
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public List<Purchase> getPurchasesByUser(String correo) {
        return purchaseRepository.findByCorreoCliente(correo);
    }
}
