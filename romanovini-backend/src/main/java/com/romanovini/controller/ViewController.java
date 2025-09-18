package com.romanovini.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ViewController {

    // Metodo per visualizzare la homepage
    @GetMapping("/")
    public String home() {
        return "index";
    }
    
    // Metodo per visualizzare la pagina di login
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    // Metodo per visualizzare la pagina di registrazione
    @GetMapping("/register")
    public String register() {
        return "register";
    }

    // Metodo per visualizzare la pagina dei prodotti
    @GetMapping("/products")
    public String products() {
        return "products";
    }
    
    // Metodo per visualizzare la pagina del carrello
    @GetMapping("/cart")
    public String cart() {
        return "cart";
    }

    // Metodo per visualizzare la pagina degli ordini
    @GetMapping("/orders")
    public String orders() {
        return "orders";
    }

    // Metodo per visualizzare i dettagli di un ordine specifico
    @GetMapping("/orders/{id}")
    public String orderDetails(@PathVariable Long id) {
        return "orders/detail";
    }

    // Metodo per visualizzare la pagina degli utenti
    @GetMapping("/users")
    public String users() {
        return "users";
    }
} 