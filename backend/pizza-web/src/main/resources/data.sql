-- -------------------------------------------------
-- 1) CUSTOMERS
--    (IDs must be provided explicitly)
-- -------------------------------------------------
INSERT INTO customer (id, name, address) VALUES
                                             (1, 'Alice Johnson',  '123 Elm Street'),
                                             (2, 'Bob Smith',      '456 Oak Avenue'),
                                             (3, 'Carol Davis',    '789 Pine Road'),
                                             (4, 'David Martinez', '321 Maple Boulevard'),
                                             (5, 'Eva Thompson',   '654 Cedar Lane');

-- -------------------------------------------------
-- 1.5) STORES
-- -------------------------------------------------
INSERT INTO store (id, name, description, address, image_url) VALUES
                                                               (1, 'Unirii Store', 'Located in the Unirii Square, the heart of the city', 'Unirii Square, no 15', '/stores/store1.png'),
                                                               (2, 'Traian Store', 'Located in Traian Square, a new hip location', 'Traian Square, no 29', '/stores/store2.png'),
                                                               (3, 'Iulius Store', 'Located in the biggest shopping mall of the city', 'Iulius Town, ground floor', '/stores/store3.png');

ALTER TABLE store ALTER COLUMN id RESTART WITH 4;

-- -------------------------------------------------
-- 2) PIZZAS
--    20 distinct pizzas, IDs 1–20
-- -------------------------------------------------
INSERT INTO pizza (id, name, description, image_url, ingredients, hotness, price, currency) VALUES
                                                  ( 1,  'Margherita',         'Classic pizza with tomato sauce and mozzarella cheese.', '/pizzas/pizza_0_0.png', 'Tomato Sauce,Mozzarella Cheese,Basil', 0, 7.99,  'RON'),
                                                  ( 2,  'Funghi',             'Mushroom pizza with mozzarella cheese.', '/pizzas/pizza_0_1.png', 'Tomato Sauce,Mozzarella Cheese,Mushrooms', 0, 8.49,  'EUR'),
                                                  ( 3,  'Diavola',            'Spicy salami pizza with hot peppers.', '/pizzas/pizza_0_2.png', 'Tomato Sauce,Mozzarella Cheese,Spicy Salami,Hot Peppers', 4, 9.99,  'RON'),
                                                  ( 4,  'Quattro Formaggi',  'Four cheese pizza with mozzarella, gorgonzola, parmesan and ricotta.', '/pizzas/pizza_1_0.png', 'Tomato Sauce,Mozzarella,Gorgonzola,Parmesan,Ricotta', 0, 11.50,  'EUR'),
                                                  ( 5,  'Hawaii',            'Ham and pineapple on a classic pizza base.', '/pizzas/pizza_1_1.png', 'Tomato Sauce,Mozzarella Cheese,Ham,Pineapple', 1, 10.00,  'RON'),
                                                  ( 6,  'Prosciutto',        'Prosciutto and arugula pizza.', '/pizzas/pizza_1_2.png', 'Tomato Sauce,Mozzarella Cheese,Prosciutto,Arugula', 0, 12.49,  'EUR'),
                                                  ( 7,  'Capricciosa',       'Pizza with ham, mushrooms, artichokes and olives.', '/pizzas/pizza_2_0.png', 'Tomato Sauce,Mozzarella Cheese,Ham,Mushrooms,Artichokes,Olives', 0, 11.20,  'RON'),
                                                  ( 8,  'Vegetariana',        'Loaded with fresh vegetables and mozzarella cheese.', '/pizzas/pizza_2_1.png', 'Tomato Sauce,Mozzarella Cheese,Bell Peppers,Olives,Onions,Zucchini', 0, 9.50,  'EUR'),
                                                  ( 9,  'Calzone',            'Folded pizza with ricotta, mozzarella and ham.', '/pizzas/pizza_2_2.png', 'Tomato Sauce,Ricotta,Mozzarella Cheese,Ham', 0, 9.75,  'RON'),
                                                  (10, 'Bufalina',           'Buffalo mozzarella with cherry tomatoes and basil.', '/pizzas/pizza_3_0.png', 'Tomato Sauce,Buffalo Mozzarella,Cherry Tomatoes,Basil', 0, 11.00,  'EUR'),
                                                  (11, 'Tonno',              'Tuna pizza with onions and capers.', '/pizzas/pizza_3_1.png', 'Tomato Sauce,Mozzarella Cheese,Tuna,Onions,Capers', 0, 10.75,  'RON'),
                                                  (12, 'Quattro Stagioni',   'Four seasons pizza with different toppings in each quarter.', '/pizzas/pizza_3_2.png', 'Tomato Sauce,Mozzarella Cheese,Ham,Mushrooms,Artichokes,Olives', 0, 12.00,  'EUR'),
                                                  (13, 'Boscaiola',          'Mushroom and sausage pizza.', '/pizzas/pizza_4_0.png', 'Tomato Sauce,Mozzarella Cheese,Mushrooms,Sausage', 2, 11.30,  'RON'),
                                                  (14, 'Spianata',           'Spicy salami pizza with hot peppers.', '/pizzas/pizza_4_1.png', 'Tomato Sauce,Mozzarella Cheese,Spicy Salami,Hot Peppers', 3, 10.90,  'EUR'),
                                                  (15, 'Napoli',              'Neapolitan pizza with anchovies and capers.', '/pizzas/pizza_4_2.png', 'Tomato Sauce,Mozzarella Cheese,Anchovies,Capers,Oregano', 1, 9.80,  'RON'),
                                                  (16, 'Puttanesca',         'Pizza with olives, capers, anchovies and tomatoes.', '/pizzas/pizza_5_0.png', 'Tomato Sauce,Mozzarella Cheese,Olives,Capers,Anchovies,Cherry Tomatoes', 2, 10.60,  'EUR'),
                                                  (17, 'Carbonara',          'Pizza with eggs, bacon and parmesan.', '/pizzas/pizza_5_1.png', 'White Sauce,Mozzarella Cheese,Eggs,Bacon,Parmesan', 0, 12.20,  'RON'),
                                                  (18, 'Siciliana',          'Sicilian pizza with eggplant and ricotta.', '/pizzas/pizza_5_2.png', 'Tomato Sauce,Mozzarella Cheese,Eggplant,Ricotta,Basil', 0, 11.75,  'EUR'),
                                                  (19, 'Peperoni',           'Spicy pepperoni with mozzarella cheese and tomato sauce.', '/pizzas/pizza_6_0.png', 'Tomato Sauce,Mozzarella Cheese,Pepperoni', 4, 10.40,  'RON'),
                                                  (20, 'Mediterranea',       'Mediterranean pizza with olives, sun-dried tomatoes and feta.', '/pizzas/pizza_6_1.png', 'Tomato Sauce,Mozzarella Cheese,Olives,Sun-dried Tomatoes,Feta Cheese', 0, 11.90,  'EUR');

ALTER TABLE pizza ALTER COLUMN id RESTART WITH 21;

-- -------------------------------------------------
-- 3) ORDERS
--    10 orders, IDs 1–10
-- -------------------------------------------------
INSERT INTO pizza_orders (id, customer_id, order_date,      order_status) VALUES
                                                                              ( 1, 1, '2025-05-20 11:30:00', 'CREATED'),
                                                                              ( 2, 2, '2025-05-21 13:15:00', 'IN_PROGRESS'),
                                                                              ( 3, 1, '2025-05-22 18:45:00', 'COMPLETED'),
                                                                              ( 4, 3, '2025-05-23 12:00:00', 'CREATED'),
                                                                              ( 5, 2, '2025-05-23 19:30:00', 'IN_DELIVERY'),
                                                                              ( 6, 1, '2025-05-24 14:20:00', 'CREATED'),
                                                                              ( 7, 3, '2025-05-24 20:10:00', 'IN_PROGRESS'),
                                                                              ( 8, 2, '2025-05-25 10:05:00', 'COMPLETED'),
                                                                              ( 9, 1, '2025-05-25 17:50:00', 'IN_DELIVERY'),
                                                                              (10, 3, '2025-05-26 09:15:00', 'CREATED');

ALTER TABLE pizza_orders ALTER COLUMN id RESTART WITH 11;

-- -------------------------------------------------
-- 4) ORDER–PIZZA LINKS
--    Each order links to 1–4 pizzas
-- -------------------------------------------------
INSERT INTO pizza_order_pizzas (pizza_order_id, pizza_id) VALUES
                                                              -- Order 1 (cust=1): Margherita, Diavola
                                                              (1,  1), (1,  3),

                                                              -- Order 2 (cust=2): Funghi, Prosciutto, Capricciosa
                                                              (2,  2), (2,  6), (2,  7),

                                                              -- Order 3 (cust=1): Bufalina
                                                              (3, 10),

                                                              -- Order 4 (cust=3): Quattro Formaggi, Vegetariana, Napoli
                                                              (4,  4), (4,  8), (4, 15),

                                                              -- Order 5 (cust=2): Spianata, Tonno
                                                              (5, 14), (5, 11),

                                                              -- Order 6 (cust=1): Calzone, Boscaiola, Hawaii, Margherita
                                                              (6,  9), (6, 13), (6,  5), (6,  1),

                                                              -- Order 7 (cust=3): Quattro Stagioni, Carbonara
                                                              (7, 12), (7, 17),

                                                              -- Order 8 (cust=2): Peperoni
                                                              (8, 19),

                                                              -- Order 9 (cust=1): Mediterranea, Puttanesca
                                                              (9, 20), (9, 16),

                                                              -- Order 10 (cust=3): Napoli, Diavola, Funghi
                                                              (10,15), (10, 3), (10, 2);

