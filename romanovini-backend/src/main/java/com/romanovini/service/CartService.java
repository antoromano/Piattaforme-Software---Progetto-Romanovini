package com.romanovini.service;

import com.romanovini.dto.CartDTO;
import com.romanovini.dto.CartItemDTO;
import com.romanovini.entity.Cart;
import com.romanovini.entity.CartItem;
import com.romanovini.entity.Product;
import com.romanovini.entity.User;
import com.romanovini.repository.CartRepository;
import com.romanovini.repository.CartItemRepository;
import com.romanovini.repository.ProductRepository;
import com.romanovini.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * CartService gestisce le operazioni relative al carrello, come aggiungere o rimuovere articoli,
 * e convertire il carrello in un DTO per il trasferimento dei dati.
 */
@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    public Cart addItemToCart(Long userId, Long productId, int quantity) {
        // Recupera l'utente
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Recupera il carrello dell'utente, o creane uno nuovo se non esiste
        Cart cart = cartRepository.findByUser(user).orElse(new Cart());
        cart.setUser(user);

        // Recupera il prodotto e verifica la disponibilità
        Product product = productRepository.findByIdWithLock(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Verifica se c'è abbastanza stock
        if (product.getStock() < quantity) {
            throw new RuntimeException("Product out of stock or insufficient quantity available");
        }

        // Riduce lo stock del prodotto
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        // Controlla se il prodotto è già nel carrello
        Optional<CartItem> existingCartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        CartItem item;
        if (existingCartItem.isPresent()) {
            // Se l'articolo è già presente, aggiorna la quantità e il prezzo
            item = existingCartItem.get();
            item.setQuantity(item.getQuantity() + quantity);  // Aggiungi la nuova quantità a quella esistente
            item.setPrice(item.getProduct().getPrice() * item.getQuantity());  // Aggiorna il prezzo
            cartItemRepository.save(item);  // Salva l'elemento aggiornato
        } else {
            // Se l'articolo non è presente, aggiungilo al carrello
            item= new CartItem();
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setPrice(product.getPrice() * quantity);
            item.setCart(cart);
            cart.getItems().add(item);
            cartItemRepository.save(item);  // Salva il nuovo elemento
        }

        // Aggiorna il prezzo totale del carrello
        double totalPrice = cart.getItems().stream().mapToDouble(CartItem::getPrice).sum();
        cart.setTotalPrice(totalPrice);

        // Salva il carrello aggiornato
        cartRepository.save(cart);
        cartItemRepository.save(item);

        return cart;
    }

    @Transactional
    public Cart removeItemFromCart(Long userId, Long productId, int quantityToRemove) {
        // Recupera l'utente
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Recupera il carrello dell'utente
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Trova l'articolo nel carrello in base al prodotto
        Optional<CartItem> cartItemOpt = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (cartItemOpt.isEmpty()) {
            throw new RuntimeException("Product not found in cart");
        }

        CartItem cartItem = cartItemOpt.get();

        // Se la quantità da rimuovere è maggiore o uguale alla quantità attuale, rimuovi l'articolo
        if (quantityToRemove >= cartItem.getQuantity()) {
            cart.getItems().remove(cartItem);
            cartItemRepository.delete(cartItem); // Rimuovi l'articolo dal repository
        } else {
            // Altrimenti, riduci semplicemente la quantità
            cartItem.setQuantity(cartItem.getQuantity() - quantityToRemove);
            cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
            cartItemRepository.save(cartItem);
        }
        // Aumenta lo stock del prodotto
        product.setStock(product.getStock() + quantityToRemove);
        productRepository.save(product);  // Aggiorna lo stock nel database

        // Aggiorna il prezzo totale del carrello
        double totalPrice = cart.getItems().stream().mapToDouble(CartItem::getPrice).sum();
        cart.setTotalPrice(totalPrice);

        // Salva il carrello aggiornato
        cartRepository.save(cart);

        return cart;
    }

    // Metodo per restituire il DTO del carrello
    public CartDTO getCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUsername(cart.getUser().getUsername());
        cartDTO.setTotalPrice(cart.getTotalPrice());

        List<CartItemDTO> itemsDTO = cart.getItems().stream()
                .map(this::convertToCartItemDTO)
                .collect(Collectors.toList());

        cartDTO.setItems(itemsDTO);

        return cartDTO;
    }

    // Metodo per restituire l'entità Cart
    public Cart getCartEntity(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    // Metodo per convertire Cart in CartDTO
    public CartDTO convertToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUsername(cart.getUser().getUsername());
        cartDTO.setTotalPrice(cart.getTotalPrice());

        List<CartItemDTO> itemsDTO = cart.getItems().stream()
                .map(this::convertToCartItemDTO)
                .collect(Collectors.toList());

        cartDTO.setItems(itemsDTO);

        return cartDTO;
    }

    // Helper per convertire un CartItem in CartItemDTO
    private CartItemDTO convertToCartItemDTO(CartItem item) {
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setProductName(item.getProduct().getName());
        itemDTO.setQuantity(item.getQuantity());
        itemDTO.setPrice(item.getPrice());
        return itemDTO;
    }

    // Metodo per svuotare il carrello
    public void clearCart(Cart cart) {
        // Rimuovi tutti gli articoli collegati al carrello
        for(CartItem item : cart.getItems()) {
            cartItemRepository.delete(item);
        }
        cart.getItems().clear(); // Rimuovi gli articoli dalla lista del carrello
        cart.setTotalPrice(0.0); // Azzerare il totalPrice
        cartRepository.save(cart); // Salva il carrello aggiornato
    }

}
