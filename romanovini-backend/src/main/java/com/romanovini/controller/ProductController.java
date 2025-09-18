package com.romanovini.controller;

import com.romanovini.entity.Product;
import com.romanovini.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Metodo per ottenere tutti i prodotti, con filtro opzionale per categoria
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String category) {
        List<Product> products;
        
        products = productService.getAllProducts();
        
        return ResponseEntity.ok(products);
    }

    // Metodo per ottenere un prodotto specifico per ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // Metodo per creare un nuovo prodotto
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }
}

