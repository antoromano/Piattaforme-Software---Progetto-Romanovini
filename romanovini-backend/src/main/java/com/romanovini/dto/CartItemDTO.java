package com.romanovini.dto;

/**
 * CartItemDTO è un Data Transfer Object che rappresenta un singolo articolo nel carrello.
 * Contiene informazioni come il nome del prodotto, la quantità e il prezzo.
 * Viene utilizzato per trasferire i dati degli articoli del carrello tra il client e il server
 * senza esporre l'intera entità Product.
 */
public class CartItemDTO {

    private String productName;  // Invece di restituire l'intera entità Product, usiamo solo il nome del prodotto
    private Integer quantity;
    private Double price;

    // Getters e Setters
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
