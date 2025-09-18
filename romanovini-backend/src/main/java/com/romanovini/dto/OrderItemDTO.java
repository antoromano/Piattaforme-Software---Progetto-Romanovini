package com.romanovini.dto;

/**
 * OrderItemDTO è un Data Transfer Object che rappresenta un singolo articolo in un ordine.
 * Include dettagli come il nome del prodotto, la quantità e il prezzo.
 * Viene utilizzato per trasferire i dati degli articoli dell'ordine tra il client e il server
 * senza esporre l'intera entità Product.
 */
public class OrderItemDTO {
    private String productName;
    private int quantity;
    private double price;

    // Getter e Setter

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

