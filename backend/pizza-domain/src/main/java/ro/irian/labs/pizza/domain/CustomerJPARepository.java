package ro.irian.labs.pizza.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerJPARepository extends JpaRepository<Customer, Long> {
} 