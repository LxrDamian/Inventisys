package proyecto_aula.inventisys.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proyecto_aula.inventisys.model.Product;
import proyecto_aula.inventisys.repository.ProductRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Product updateProduct(String id, Product product) {
        Product existingProduct = getProductById(id);
        existingProduct.setNombre(product.getNombre());
        existingProduct.setCantidad(product.getCantidad());
        existingProduct.setPrecio(product.getPrecio());
        return productRepository.save(existingProduct);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public void updateStock(String id, Integer cantidad) {
        Product product = getProductById(id);
        product.setCantidad(product.getCantidad() - cantidad);
        productRepository.save(product);
    }
}
