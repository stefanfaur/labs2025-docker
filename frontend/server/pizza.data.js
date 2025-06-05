const pizzas_data = [
  {
    id: 'pizza_0_0',
    imageUrl: '/pizzas/pizza_0_0.png',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce and mozzarella cheese.',
    price: 8.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Basil'],
    hotness: 0
  },
  {
    id: 'pizza_0_1',
    imageUrl: '/pizzas/pizza_0_1.png',
    name: 'Pepperoni',
    description: 'Spicy pepperoni with mozzarella cheese and tomato sauce.',
    price: 9.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Pepperoni'],
    hotness: 4
  },
  {
    id: 'pizza_0_2',
    imageUrl: '/pizzas/pizza_0_2.png',
    name: 'Vegetarian',
    description: 'Loaded with fresh vegetables and mozzarella cheese.',
    price: 10.49,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Bell Peppers', 'Olives', 'Onions'],
    hotness: 0
  },
  {
    id: 'pizza_1_0',
    imageUrl: '/pizzas/pizza_1_0.png',
    name: 'BBQ Chicken',
    description: 'Grilled chicken with BBQ sauce and red onions.',
    price: 11.49,
    ingredients: ['BBQ Sauce', 'Mozzarella Cheese', 'Grilled Chicken', 'Red Onions'],
    hotness: 2
  },
  {
    id: 'pizza_1_1',
    imageUrl: '/pizzas/pizza_1_1.png',
    name: 'Hawaiian',
    description: 'Ham and pineapple on a classic pizza base.',
    price: 10.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Ham', 'Pineapple'],
    hotness: 1
  },
  {
    id: 'pizza_1_2',
    imageUrl: '/pizzas/pizza_1_2.png',
    name: 'Meat Lovers',
    description: 'A carnivore\'s dream with various meats and cheese.',
    price: 12.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Pepperoni', 'Sausage', 'Bacon'],
    hotness: 3
  },
  {
    id: 'pizza_2_0',
    imageUrl: '/pizzas/pizza_2_0.png',
    name: 'Buffalo Chicken',
    description: 'Spicy buffalo chicken with blue cheese dressing.',
    price: 11.99,
    ingredients: ['Buffalo Sauce', 'Mozzarella Cheese', 'Grilled Chicken', 'Blue Cheese'],
    hotness: 1
  },
  {
    id: 'pizza_2_1',
    imageUrl: '/pizzas/pizza_2_1.png',
    name: 'Four Cheese',
    description: 'A blend of four delicious cheeses on a crispy crust.',
    price: 10.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Parmesan', 'Gorgonzola', 'Ricotta'],
    hotness: 0
  },
  {
    id: 'pizza_2_2',
    imageUrl: '/pizzas/pizza_2_2.png',
    name: 'Pesto Veggie',
    description: 'Fresh vegetables with pesto sauce and mozzarella cheese.',
    price: 10.49,
    ingredients: ['Pesto Sauce', 'Mozzarella Cheese', 'Zucchini', 'Spinach', 'Feta Cheese'],
    hotness: 0
  },
  {
    id: 'pizza_3_0',
    imageUrl: '/pizzas/pizza_3_0.png',
    name: 'Spicy Jalapeño',
    description: 'Spicy jalapeños with pepperoni and mozzarella cheese.',
    price: 11.49,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Jalapeños', 'Pepperoni'],
    hotness: 5
  },
  {
    id: 'pizza_3_1',
    imageUrl: '/pizzas/pizza_3_1.png',
    name: 'Seafood Delight',
    description: 'A mix of seafood with a garlic sauce base.',
    price: 13.49,
    ingredients: ['Garlic Sauce', 'Mozzarella Cheese', 'Shrimp', 'Crab'],
    hotness: 2
  },
  {
    id: 'pizza_3_2',
    imageUrl: '/pizzas/pizza_3_2.png',
    name: 'Caprese',
    description: 'Fresh mozzarella, tomatoes, and basil on a thin crust.',
    price: 9.49,
    ingredients: ['Tomato Sauce', 'Fresh Mozzarella', 'Tomatoes', 'Basil'],
    hotness: 0
  },
  {
    id: 'pizza_4_0',
    imageUrl: '/pizzas/pizza_4_0.png',
    name: 'Baked Ziti',
    description: 'Baked pasta with marinara and mozzarella cheese.',
    price: 11.99,
    ingredients: ['Marinara Sauce', 'Mozzarella Cheese', 'Ziti Pasta'],
    hotness: 0
  },
  {
    id: 'pizza_4_1',
    imageUrl: '/pizzas/pizza_4_1.png',
    name: 'Greek Pizza',
    description: 'Feta cheese, olives, and spinach on a classic base.',
    price: 10.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Feta Cheese', 'Olives', 'Spinach'],
    hotness: 0
  },
  {
    id: 'pizza_4_2',
    imageUrl: '/pizzas/pizza_4_2.png',
    name: 'Pesto Chicken',
    description: 'Grilled chicken with pesto sauce and mozzarella cheese.',
    price: 11.49,
    ingredients: ['Pesto Sauce', 'Mozzarella Cheese', 'Grilled Chicken'],
    hotness: 1
  },
  {
    id: 'pizza_5_0',
    imageUrl: '/pizzas/pizza_5_0.png',
    name: 'Shrimp Scampi Pizza',
    description: 'Shrimp with garlic sauce and mozzarella cheese.',
    price: 12.99,
    ingredients: ['Garlic Sauce', 'Mozzarella Cheese', 'Shrimp'],
    hotness: 2
  },
  {
    id: 'pizza_5_1',
    imageUrl: '/pizzas/pizza_5_1.png',
    name: 'Teriyaki Chicken',
    description: 'Grilled chicken with teriyaki sauce and pineapple.',
    price: 11.49,
    ingredients: ['Teriyaki Sauce', 'Mozzarella Cheese', 'Grilled Chicken', 'Pineapple'],
    hotness: 1
  },
  {
    id: 'pizza_5_2',
    imageUrl: '/pizzas/pizza_5_2.png',
    name: 'Mushroom Swiss',
    description: 'Sautéed mushrooms with Swiss cheese on a classic base.',
    price: 10.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Sautéed Mushrooms', 'Swiss Cheese'],
    hotness: 0
  },
  {
    id: 'pizza_6_0',
    imageUrl: '/pizzas/pizza_6_0.png',
    name: 'BBQ Bacon',
    description: 'BBQ sauce with bacon and mozzarella cheese.',
    price: 11.99,
    ingredients: ['BBQ Sauce', 'Mozzarella Cheese', 'Bacon'],
    hotness: 1
  },
  {
    id: 'pizza_6_1',
    imageUrl: '/pizzas/pizza_6_1.png',
    name: 'Buffalo Veggie',
    description: 'Spicy buffalo sauce with fresh vegetables.',
    price: 10.49,
    ingredients: ['Buffalo Sauce', 'Mozzarella Cheese', 'Bell Peppers', 'Onions'],
    hotness: 3
  },
  {
    id: 'pizza_6_2',
    imageUrl: '/pizzas/pizza_6_2.png',
    name: 'Caprese Chicken',
    description: 'Grilled chicken with mozzarella, basil, and balsamic glaze.',
    price: 11.49,
    ingredients: ['Balsamic Glaze', 'Mozzarella Cheese', 'Grilled Chicken', 'Basil'],
    hotness: 0
  },
  {
    id: 'pizza_7_0',
    imageUrl: '/pizzas/pizza_7_0.png',
    name: 'Vegetable Lasagna',
    description: 'Layered pasta with mixed vegetables and marinara sauce.',
    price: 10.99,
    ingredients: ['Marinara Sauce', 'Mozzarella Cheese', 'Lasagna Noodles', 'Mixed Vegetables'],
    hotness: 0
  },
  {
    id: 'pizza_7_1',
    imageUrl: '/pizzas/pizza_7_1.png',
    name: 'Pasta Salad Pizza',
    description: 'Cold pasta salad with cherry tomatoes, olives, and feta.',
    price: 9.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Pasta Salad'],
    hotness: 0
  },
  {
    id: 'pizza_7_2',
    imageUrl: '/pizzas/pizza_7_2.png',
    name: 'Pasta al Limone',
    description: 'Pasta in a lemon cream sauce with parmesan.',
    price: 10.49,
    ingredients: ['Lemon Cream Sauce', 'Parmesan Cheese', 'Pasta'],
    hotness: 0
  },
  {
    id: 'pizza_8_0',
    imageUrl: '/pizzas/pizza_8_0.png',
    name: 'Beef Stroganoff Pizza',
    description: 'Pizza with beef, mushrooms, and creamy sauce.',
    price: 12.49,
    ingredients: ['Creamy Sauce', 'Mozzarella Cheese', 'Beef', 'Mushrooms'],
    hotness: 1
  },
  {
    id: 'pizza_8_1',
    imageUrl: '/pizzas/pizza_8_1.png',
    name: 'Shrimp Alfredo Pizza',
    description: 'Shrimp in a creamy Alfredo sauce on pizza.',
    price: 13.49,
    ingredients: ['Alfredo Sauce', 'Mozzarella Cheese', 'Shrimp'],
    hotness: 2
  },
  {
    id: 'pizza_8_2',
    imageUrl: '/pizzas/pizza_8_2.png',
    name: 'Vegetable Primavera Pizza',
    description: 'Fresh vegetables with a light sauce on pizza.',
    price: 10.99,
    ingredients: ['Tomato Sauce', 'Mozzarella Cheese', 'Mixed Vegetables'],
    hotness: 0
  }
];

export default pizzas_data;
