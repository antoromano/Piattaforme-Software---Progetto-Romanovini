package com.romanovini.controller;

import com.romanovini.dto.OrderDTO;
import com.romanovini.entity.Product;
import com.romanovini.entity.User;
import com.romanovini.service.OrderService;
import com.romanovini.service.ProductService;
import com.romanovini.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    // Metodo per ottenere tutti gli utenti
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    // Metodo per aggiungere un nuovo prodotto
    @PostMapping("/products/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    // Metodo per aggiornare un prodotto esistente
    @PutMapping("/products/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(productId, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    // Metodo per rimuovere un prodotto dal catalogo
    @DeleteMapping("/products/delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // Metodo per attivare un prodotto
    @PutMapping("/activate/{productId}")
    public ResponseEntity<String> activateProduct(@PathVariable Long productId) {
        productService.activateProduct(productId);
        return ResponseEntity.ok("Product activated successfully");
    }

    // Metodo per disattivare un prodotto
    @PutMapping("/deactivate/{productId}")
    public ResponseEntity<String> deactivateProduct(@PathVariable Long productId) {
        productService.deactivateProduct(productId);
        return ResponseEntity.ok("Product deactivated successfully");
    }

    // Metodo per ottenere la lista degli ordini, con filtri opzionali
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long productId) {

        List<OrderDTO> orders;
        if (userId != null) {
            // Filtra per utente specifico
            orders = orderService.getOrdersByUserId(userId);
        } else if (productId != null) {
            // Filtra per prodotto specifico
            orders = orderService.getOrdersByProductId(productId);
        } else {
            // Ottieni tutti gli ordini
            orders = orderService.getAllOrders();
        }
        return ResponseEntity.ok(orders);
    }
}
