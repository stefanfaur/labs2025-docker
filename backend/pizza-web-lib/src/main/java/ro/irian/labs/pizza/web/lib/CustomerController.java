package ro.irian.labs.pizza.web.lib;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import ro.irian.labs.pizza.domain.Customer;
import ro.irian.labs.pizza.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    @Secured("ROLE_ADMIN")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{customerId}")
    @Secured("ROLE_ADMIN")
    public Customer getCustomerById(@PathVariable Long customerId) {
        return customerService.getCustomerById(customerId);
    }

    @PostMapping
    @Secured("ROLE_ADMIN")
    public Customer saveOrUpdateCustomer(@RequestBody Customer customer) {
        return customerService.saveOrUpdateCustomer(customer);
    }
} 