package ro.irian.labs.pizza.service.api;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import ro.irian.labs.pizza.domain.CurrencyType;

@UniqueName
public class PizzaDTO {

    private Long id;

    @NotNull
    @Pattern(regexp = "^[A-Za-z ]+$")
    private String name;

    private String description;

    private String imageUrl;

    private String ingredients;

    private Integer hotness;

    @NotNull
    @Min(0)
    @Max(1000)
    private Double price;

    private CurrencyType currency;

    public PizzaDTO() {
    }

    public PizzaDTO(String name, Double price, CurrencyType currency) {
        this.name = name;
        this.price = price;
        this.currency = currency;
    }

    public PizzaDTO(Long id, String name, String description, String imageUrl, String ingredients, Integer hotness, Double price, CurrencyType currency) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.hotness = hotness;
        this.price = price;
        this.currency = currency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public CurrencyType getCurrency() {
        return currency;
    }

    public void setCurrency(CurrencyType currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public Integer getHotness() {
        return hotness;
    }

    public void setHotness(Integer hotness) {
        this.hotness = hotness;
    }
}
