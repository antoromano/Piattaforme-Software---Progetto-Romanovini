package com.romanovini.service;

import com.romanovini.dto.OrderDTO;
import com.romanovini.dto.OrderItemDTO;
import com.romanovini.entity.*;
import com.romanovini.repository.OrderRepository;
import com.romanovini.repository.OrderItemRepository;
import com.romanovini.repository.ProductRepository;
import com.romanovini.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * OrderService gestisce le operazioni relative agli ordini, come la creazione,
 * il recupero e la verifica degli ordini.
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartService cartService;  // Iniettare CartService
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order createOrderFromCart(Long userId) {
        // Recupera il carrello dell'utente autenticato
        Cart cart = cartService.getCartEntity(userId);

        // Se il carrello è vuoto, lancia un'eccezione
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Empty cart");
        }

        // Crea un nuovo ordine
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setTotalPrice(cart.getTotalPrice());
        Order savedOrder = orderRepository.save(order);

        // Trasferisci gli articoli dal carrello all'ordine
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItemRepository.save(orderItem);
        }

        // Svuota il carrello solo dopo la creazione dell'ordine
        cartService.clearCart(cart);

        return savedOrder;
    }
    // Metodo per ottenere gli ordini di un utente
    @Transactional
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }
    // Recupera tutti gli ordini
    @Transactional
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }
    // Filtra gli ordini per prodotto
    @Transactional
    public List<OrderDTO> getOrdersByProductId(Long productId) {
        List<Order> orders = orderRepository.findByProductId(productId);
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }
    // Metodo di conversione da Order a OrderDTO
    public OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setUsername(order.getUser().getUsername());
        orderDTO.setTotalPrice(order.getTotalPrice());

        // Converti gli articoli dell'ordine in DTO
        List<OrderItemDTO> itemsDTO = order.getItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setProductName(item.getProduct().getName());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        orderDTO.setItems(itemsDTO);

        return orderDTO;
    }
    // Metodo per eliminare un ordine
    @Transactional
    public void deleteOrder(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Verifica che l'ordine appartenga all'utente
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized action");
        }

        orderRepository.delete(order);  // Elimina l'ordine
    }

    // Metodo per verificare un ordine
    @Transactional
    public OrderDTO verifyOrder(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Verifica che l'ordine appartenga all'utente
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized action");
        }

        return convertToOrderDTO(order);
    }
}

