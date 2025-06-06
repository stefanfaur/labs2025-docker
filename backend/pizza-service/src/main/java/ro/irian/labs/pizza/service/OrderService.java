package ro.irian.labs.pizza.service;

import org.springframework.stereotype.Service;
import ro.irian.labs.pizza.domain.*;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderJPARepository orderRepository;
    private final CustomerJPARepository customerRepository;
    private final PizzaJPARepository pizzaRepository;

    public OrderService(OrderJPARepository orderRepository, CustomerJPARepository customerRepository, PizzaJPARepository pizzaRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.pizzaRepository = pizzaRepository;
    }

    public List<PizzaOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<PizzaOrder> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public PizzaOrder getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow();
    }

    public PizzaOrder createOrder(Long customerId, List<Long> pizzaIds) {
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        List<Pizza> pizzas = pizzaRepository.findAllById(pizzaIds);

        PizzaOrder order = new PizzaOrder();
        order.setCustomer(customer);
        order.setPizzas(pizzas);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.CREATED);

        return orderRepository.save(order);
    }

    /**
     * Map username to customer ID for demo purposes
     * In a real application, this would be stored in the database
     */
    public Long getCustomerIdByUsername(String username) {
        return switch (username) {
            case "customer" -> 1L;  // customer user maps to customer ID 1 (Alice Johnson)
            case "user" -> 2L;      // user maps to customer ID 2 (Bob Smith) 
            default -> null;        // admin and other users don't have customer IDs
        };
    }
} 