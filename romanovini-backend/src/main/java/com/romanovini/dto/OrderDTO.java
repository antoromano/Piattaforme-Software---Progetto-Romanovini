package com.romanovini.dto;

import com.romanovini.dto.OrderItemDTO;

import java.util.List;

/**
 * OrderDTO rappresenta un ordine effettuato da un utente.
 * Include dettagli come l'ID dell'ordine, il nome utente, il prezzo totale e gli articoli ordinati.
 * Viene utilizzato per trasferire i dati dell'ordine tra il client e il server
 * senza esporre l'intera entità Order.
 */
public class OrderDTO {
    private Long id;
    private String username;
    private double totalPrice;
    private List<OrderItemDTO> items;

    // Getter e Setter

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

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}
