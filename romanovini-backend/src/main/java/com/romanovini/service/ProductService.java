package com.romanovini.service;

import com.romanovini.entity.Product;
import com.romanovini.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ProductService gestisce le operazioni relative ai prodotti, come il recupero,
 * l'aggiornamento e la gestione dello stato attivo/inattivo dei prodotti.
 */
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    /**
     * Recupera tutti i prodotti.
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Recupera un prodotto per ID.
     */
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    /**
     * Salva un nuovo prodotto.
     */
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Aggiorna un prodotto esistente.
     */
    public Product updateProduct(Long productId, Product productDetails) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        return productRepository.save(product);
    }

    /**
     * Elimina un prodotto.
     */
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }

    /**
     * Attiva un prodotto.
     */
    @Transactional
    public void activateProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(true);
        productRepository.save(product);
    }

    /**
     * Disattiva un prodotto.
     */
    @Transactional
    public void deactivateProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setActive(false);
        productRepository.save(product);
    }
}

