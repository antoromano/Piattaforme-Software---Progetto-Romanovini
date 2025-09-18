package com.romanovini.controller;
import com.romanovini.dto.OrderDTO;
import com.romanovini.entity.Order;
import com.romanovini.entity.User;
import com.romanovini.service.JwtUtil;
import com.romanovini.service.OrderService;
import com.romanovini.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    // Metodo per creare un nuovo ordine
    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createOrder(@RequestHeader("Authorization") String token, Authentication authentication) {
        // Estrai il token senza il prefisso "Bearer "
        String jwt = token.substring(7);

        // Estrai l'username dal token
        String username = jwtUtil.extractUsername(jwt);

        // Trova l'utente in base all'username
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Crea l'ordine dal carrello dell'utente autenticato
        Order order = orderService.createOrderFromCart(user.getId());
        OrderDTO orderDTO = orderService.convertToOrderDTO(order);

        return ResponseEntity.ok(orderDTO);
    }

    // Metodo per ottenere tutti gli ordini dell'utente autenticato
    @GetMapping("/list")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@RequestHeader("Authorization") String token) {
        // Estrai il token senza il prefisso "Bearer "
        String jwt = token.substring(7);

        // Estrai l'username dal token
        String username = jwtUtil.extractUsername(jwt);

        // Trova l'utente in base all'username
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Ottieni tutti gli ordini dell'utente
        List<OrderDTO> orders = orderService.getOrdersByUserId(user.getId());

        return ResponseEntity.ok(orders);
    }

    // Metodo per eliminare un ordine
    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        orderService.deleteOrder(orderId, user.getId());

        return ResponseEntity.ok("Order deleted successfully");
    }

    // Metodo per verificare un ordine
    @GetMapping("/verify/{orderId}")
    public ResponseEntity<OrderDTO> verifyOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        OrderDTO orderDTO = orderService.verifyOrder(orderId, user.getId());

        return ResponseEntity.ok(orderDTO);
    }
}

