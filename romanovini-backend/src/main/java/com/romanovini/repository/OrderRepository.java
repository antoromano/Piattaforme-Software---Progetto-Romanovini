package com.romanovini.repository;

import com.romanovini.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    @Query("SELECT o FROM Order o JOIN o.items oi WHERE oi.product.id = :productId")
    List<Order> findByProductId(@Param("productId") Long productId);
}

