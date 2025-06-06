package ro.irian.labs.pizza.service;

import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ro.irian.labs.pizza.domain.CurrencyValue;
import ro.irian.labs.pizza.domain.Pizza;
import ro.irian.labs.pizza.domain.PizzaJPARepository;
import ro.irian.labs.pizza.service.api.PizzaDTO;
import ro.irian.labs.pizza.service.api.PizzaService;

import java.util.List;
import java.util.stream.IntStream;

@Service
@Primary
public class ItalianPizzaService implements PizzaService {

    private final PizzaJPARepository pizzaRepository;

    public ItalianPizzaService(PizzaJPARepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    @Override
    public List<Pizza> getAllPizzas(){
        return pizzaRepository.findAll();
    }

    @Override
    public Pizza getPizzaById(Long id){
        return pizzaRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Pizza> getPizzaByNameContains(String nameContainsString){
        return pizzaRepository.findAllByNameContainsIgnoreCase(nameContainsString);
    }

    @Override
    public Page<Pizza> getPagedPizzas(Pageable pageable) {
        return pizzaRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Long savePizza(PizzaDTO pizzaDTO) {
        Pizza pizza = new Pizza();

        pizza.setName(pizzaDTO.getName());
        pizza.setDescription(pizzaDTO.getDescription());
        pizza.setImageUrl(pizzaDTO.getImageUrl());
        pizza.setIngredients(pizzaDTO.getIngredients());
        pizza.setHotness(pizzaDTO.getHotness());
        pizza.setCurrencyValue(new CurrencyValue(pizzaDTO.getPrice(), pizzaDTO.getCurrency()));

        save(pizza);
        return pizza.getId();
    }

    @Override
    @Transactional
    public Long updatePizza(Long id, PizzaDTO pizzaDTO) {
        Pizza pizza = pizzaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pizza not found with id: " + id));

        pizza.setName(pizzaDTO.getName());
        pizza.setDescription(pizzaDTO.getDescription());
        pizza.setImageUrl(pizzaDTO.getImageUrl());
        pizza.setIngredients(pizzaDTO.getIngredients());
        pizza.setHotness(pizzaDTO.getHotness());
        pizza.setCurrencyValue(new CurrencyValue(pizzaDTO.getPrice(), pizzaDTO.getCurrency()));

        save(pizza);
        return pizza.getId();
    }

    @Override
    @Transactional
    public void deletePizza(Long id) {
        pizzaRepository.deleteById(id);
    }

    @Override
    public boolean existsByName(String value) {
        return pizzaRepository.existsByName(value);
    }

    @Override
    public boolean isNameUniqueForPizza(Long pizzaId, String name) {
        // If pizzaId is null, it's a new pizza, so just check existence
        if (pizzaId == null) {
            return !pizzaRepository.existsByName(name);
        }
        
        // For existing pizza, check if any other pizza has this name
        return pizzaRepository.findAll().stream()
                .noneMatch(pizza -> !pizza.getId().equals(pizzaId) && pizza.getName().equals(name));
    }

    private void save(Pizza pizza) {
        pizzaRepository.save(pizza);
    }


}
