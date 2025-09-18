package com.romanovini.dto;

import java.util.List;

/**
 * Contiene informazioni essenziali come l'ID del carrello, il nome utente,
 * gli articoli nel carrello e il prezzo totale.
 * Viene utilizzato per trasferire i dati del carrello tra il client e il server
 * senza esporre l'intera entità Cart.
 */
public class CartDTO {

    private Long id;
    private String username;  // Invece di restituire l'intera entità User, usiamo solo il nome utente
    private List<CartItemDTO> items;
    private Double totalPrice;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
