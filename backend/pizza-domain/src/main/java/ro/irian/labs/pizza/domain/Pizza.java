package ro.irian.labs.pizza.domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "pizza")
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "ingredients")
    private String ingredients;

    @Column(name = "hotness")
    private Integer hotness;

    @Embedded
    private CurrencyValue currencyValue;

    public Pizza() {}

    public Pizza(Long id, String name, Double price) {
        this.id = id;
        this.name = name;
        this.currencyValue = new CurrencyValue(price, CurrencyType.RON);
    }

    public Pizza(Long id, String name, String description, String imageUrl, String ingredients, Integer hotness, Double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.hotness = hotness;
        this.currencyValue = new CurrencyValue(price, CurrencyType.RON);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }



    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public CurrencyValue getCurrencyValue() {
        return currencyValue;
    }

    public void setCurrencyValue(CurrencyValue currencyValue) {
        this.currencyValue = currencyValue;
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

    public boolean nameContains(String nameContains) {
        return name.toLowerCase()
                .contains(nameContains.toLowerCase());
    }

    @Override
    public String toString() {
        return "Pizza{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pizza pizza = (Pizza) o;
        return Objects.equals(id, pizza.id) && Objects.equals(name, pizza.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
