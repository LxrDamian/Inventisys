package proyecto_aula.inventisys.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proyecto_aula.inventisys.model.*;
import proyecto_aula.inventisys.repository.CartRepository;
import proyecto_aula.inventisys.repository.ProductRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public Cart getCartForUser(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    return cartRepository.save(cart);
                });
    }

    public Cart addItem(String userId, String productId, int quantity) {
        Cart cart = getCartForUser(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + quantity);
        } else {
            CartItem item = new CartItem();
            item.setProductId(product.getId());
            item.setProductName(product.getNombre());
            item.setPrice(product.getPrecio());
            item.setQuantity(quantity);
            cart.getItems().add(item);
        }

        return cartRepository.save(cart);
    }

    public Cart updateItem(String userId, String productId, int quantity) {
        Cart cart = getCartForUser(userId);

        cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .ifPresent(i -> i.setQuantity(quantity));

        return cartRepository.save(cart);
    }

    public Cart removeItem(String userId, String productId) {
        Cart cart = getCartForUser(userId);

        cart.getItems().removeIf(i -> i.getProductId().equals(productId));

        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        Cart cart = getCartForUser(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
