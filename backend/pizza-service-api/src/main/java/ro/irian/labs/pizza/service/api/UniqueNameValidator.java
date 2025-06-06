package ro.irian.labs.pizza.service.api;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class UniqueNameValidator implements ConstraintValidator<UniqueName, Object> {
    private final PizzaService pizzaService;

    public UniqueNameValidator(PizzaService pizzaService) {
        this.pizzaService = pizzaService;
    }

    @Override
    public void initialize(UniqueName constraint) { }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext ctx) {
        if (obj == null) {
            return true;
        }
        
        // If it's a String (for backward compatibility)
        if (obj instanceof String) {
            String value = (String) obj;
            return value != null && !pizzaService.existsByName(value.trim());
        }
        
        // If it's a PizzaDTO (new validation logic)
        if (obj instanceof PizzaDTO) {
            PizzaDTO dto = (PizzaDTO) obj;
            if (dto.getName() == null) {
                return false;
            }
            return pizzaService.isNameUniqueForPizza(dto.getId(), dto.getName().trim());
        }
        
        return false;
    }
}

