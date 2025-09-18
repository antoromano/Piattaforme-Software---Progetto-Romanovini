package com.romanovini.controller;

import com.romanovini.dto.CartDTO;
import com.romanovini.dto.CartRequestDTO;
import com.romanovini.entity.Cart;
import com.romanovini.entity.User;
import com.romanovini.service.CartService;
import com.romanovini.service.JwtUtil;
import com.romanovini.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
   @Autowired
   private JwtUtil jwtUtil;
   @Autowired
   private UserService userService;

    // Metodo per aggiungere un prodotto al carrello
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addItemToCart(@AuthenticationPrincipal UserDetails userDetails, @RequestBody CartRequestDTO request) {
        // Estrai il nome utente dall'oggetto UserDetails
        String username = userDetails.getUsername();
        // Trova l'utente dal database
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.addItemToCart(user.getId(), request.getProductId(), request.getQuantity());
        CartDTO cartDTO = cartService.convertToCartDTO(cart);  // Conversione in DTO
        return ResponseEntity.ok(cartDTO);
    }

    // Metodo per rimuovere un prodotto dal carrello
    @PostMapping("/remove")
    public ResponseEntity<CartDTO> removeItemFromCart(@AuthenticationPrincipal UserDetails userDetails, @RequestBody CartRequestDTO request) {
        // Estrai il nome utente dall'oggetto UserDetails
        String username = userDetails.getUsername();
        // Trova l'utente dal database
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.removeItemFromCart(user.getId(), request.getProductId(), request.getQuantity());
        CartDTO cartDTO = cartService.convertToCartDTO(cart); // Converti in DTO
        return ResponseEntity.ok(cartDTO);  // Ritorna il DTO
    }

    // Metodo per recuperare il carrello dell'utente autenticato
    @GetMapping("/get")
    public ResponseEntity<CartDTO> getCart(@RequestHeader("Authorization") String token) {
        // Estrae il token senza il prefisso "Bearer "
        String jwt = token.substring(7);

        // Estrai l'username dal token
        String username = jwtUtil.extractUsername(jwt);

        // Trova l'utente in base all'username
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Estrai il carrello dell'utente
        CartDTO cartDTO = cartService.getCart(user.getId());
        return ResponseEntity.ok(cartDTO);
    }
}
