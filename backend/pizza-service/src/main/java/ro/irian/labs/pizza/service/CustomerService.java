package ro.irian.labs.pizza.service;

import org.springframework.stereotype.Service;
import ro.irian.labs.pizza.domain.Customer;
import ro.irian.labs.pizza.domain.CustomerJPARepository;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerJPARepository customerRepository;

    public CustomerService(CustomerJPARepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow();
    }

    public Customer saveOrUpdateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
} 