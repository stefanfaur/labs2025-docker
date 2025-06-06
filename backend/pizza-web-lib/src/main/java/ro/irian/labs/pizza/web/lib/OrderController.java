package ro.irian.labs.pizza.web.lib;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ro.irian.labs.pizza.domain.PizzaOrder;
import ro.irian.labs.pizza.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("orders")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public List<PizzaOrder> getAllOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        logger.info("User '{}' is requesting orders", username);
        logger.info("User authorities: {}", authentication.getAuthorities());
        
        // Check if user has admin role
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
                
        logger.info("User '{}' is admin: {}", username, isAdmin);
                
        if (isAdmin) {
            // Admins see all orders
            logger.info("Returning all orders for admin user '{}'", username);
            return orderService.getAllOrders();
        } else {
            // Customers see only their orders
            Long customerId = orderService.getCustomerIdByUsername(username);
            logger.info("Customer ID for user '{}': {}", username, customerId);
            
            if (customerId != null) {
                List<PizzaOrder> customerOrders = orderService.getOrdersByCustomerId(customerId);
                logger.info("Returning {} orders for customer '{}' (ID: {})", customerOrders.size(), username, customerId);
                return customerOrders;
            } else {
                // If customer ID not found, return empty list
                logger.warn("No customer ID found for user '{}', returning empty order list", username);
                return List.of();
            }
        }
    }

    @GetMapping("/{orderId}")
    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public PizzaOrder getOrderById(@PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Check if user has admin role
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
                
        PizzaOrder order = orderService.getOrderById(orderId);
        
        if (isAdmin) {
            // Admins can view any order
            return order;
        } else {
            // Customers can only view their own orders
            Long customerId = orderService.getCustomerIdByUsername(username);
            if (customerId != null && order.getCustomer().getId().equals(customerId)) {
                return order;
            } else {
                throw new RuntimeException("Order not found or access denied");
            }
        }
    }

    @PostMapping
    @Secured("ROLE_CUSTOMER")
    public PizzaOrder createOrder(@RequestBody OrderCreateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        logger.info("User '{}' is creating order for customer ID: {} with pizzas: {}", 
                username, request.getCustomerId(), request.getPizzaIds());
                
        return orderService.createOrder(request.getCustomerId(), request.getPizzaIds());
    }
}

class OrderCreateRequest {
    private Long customerId;
    private List<Long> pizzaIds;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<Long> getPizzaIds() {
        return pizzaIds;
    }

    public void setPizzaIds(List<Long> pizzaIds) {
        this.pizzaIds = pizzaIds;
    }
} 