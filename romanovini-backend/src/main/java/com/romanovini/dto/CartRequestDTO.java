package com.romanovini.dto;

/**
 * CartRequestDTO è utilizzato per le richieste di modifica del carrello.
 * Contiene informazioni come l'ID dell'utente, l'ID del prodotto e la quantità.
 * Viene utilizzato per trasferire i dati delle richieste di modifica del carrello tra il client e il server.
 */
public class CartRequestDTO {

    private Long userId;
    private Long productId;
    private int quantity;

    // Getters e Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
