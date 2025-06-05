import express from 'express'
import bodyParser from 'express'
import cors from 'cors'

import pizzas_data from './pizza.data.js';
import burgers_data from "./burgers.data.js";
import pastas_data from "./pasta.data.js";

let pizzas = [...pizzas_data];
let burgers = [...burgers_data];
let pastas = [...pastas_data];

const app = express()
const PORT = 3000

app.use(cors()) // allow requests from Angular app
app.use(bodyParser.json()) // To parse JSON request bodies

app.set('query parser', 'extended');



let stores = [
  {
    id: 's1',
    imageUrl: '/stores/store1.png',
    name: 'Unirii',
    description: 'Located in the Unirii Square, the heart of the city',
    address: 'Unirii Square, no 15'
  },
  {
    id: 's2',
    imageUrl: '/stores/store2.png',
    name: 'Traian',
    description: 'Located in Traian Square, a new hip location',
    address: 'Traian Square, no 29'
  },
  {
    id: 's3',
    imageUrl: '/stores/store3.png',
    name: 'Iulius',
    description: 'Located in the biggest shopping mall of the city',
    address: 'Iulius Town, ground floor'
  }
];

let customers = [
  {
    id: 'c1',
    firstName: 'Mihai',
    lastName: 'Vulpe',
    age: 31,
    city: 'Timisoara',
    country: 'Romania'
  },
  {
    id: 'c2',
    firstName: 'John',
    lastName: 'Doe',
    age: 24,
    city: 'London',
    country: 'United Kingdom'
  },
  {
    id: 'c3',
    firstName: 'Vivian',
    lastName: 'Wehrle',
    age: 29,
    city: 'Zurich',
    country: 'Switzerland'
  },
  {
    id: 'c4',
    firstName: 'Luis',
    lastName: 'Fernandez',
    age: 45,
    city: 'Lisbon',
    country: 'Portugal'
  },
  {
    id: 'c5',
    firstName: 'Jyoti',
    lastName: 'Verma',
    age: 30,
    city: 'Mumbai',
    country: 'India'
  },
  {
    id: 'c6',
    firstName: 'Giorgios',
    lastName: 'Marinakis',
    age: 55,
    city: 'Athens',
    country: 'Greece'
  },
];

app.get('/api/pizzas', (req, res) => {
  res.json(pizzas)
})

app.get('/api/stores', (req, res) => {
  res.json(stores)
})

app.get('/api/customers', (req, res) => {
  res.json(customers)
})

app.get('/api/stores/:id', (req, res) => {
  const id = req.params['id']
  const aStore = stores.find(item => item.id === id)
  res.json(aStore)
})

app.get('/api/customers/:id', (req, res) => {
  const id = req.params['id']
  const aCustomer = customers.find(item => item.id === id)
  res.json(aCustomer)
})

app.get('/api/auth', (req, res) => {
  res.json(false)
})

app.post('/api/pizzas', (req, res) => {
  const {id, imageUrl, name, description, price, ingredients, hotness} = req.body

  if (!name || !description) {
    return res.status(400).json({message: 'Name and description are required.'})
  }

  const tempPizzas = [...pizzas];
  const index = tempPizzas.findIndex(p => p.id === id)

  const newPizza = {id, imageUrl, name, description, price, ingredients, hotness}
  if (index !== -1) {
    tempPizzas[index] = newPizza
    pizzas = tempPizzas
  } else {
    pizzas = [...tempPizzas, newPizza]
  }

  // Send back the newly added pizza
  res.status(201).json(newPizza)
})

app.post('/api/customers', (req, res) => {
  const {id, firstName, lastName, age, city, country} = req.body

  if (!firstName || !lastName) {
    return res.status(400).json({message: 'First Name and Last Name are required.'})
  }

  const tempCustomers = [...customers];
  const index = tempCustomers.findIndex(p => p.id === id)

  const newCustomer = {id, firstName, lastName, age, city, country}
  if (index !== -1) {
    tempCustomers[index] = newCustomer
    customers = tempCustomers
  } else {
    return res.status(400).json({message: 'No customer found with this ID.'})
  }

  res.status(201).json(newCustomer)
})

app.delete('/api/pizzas/:id', (req, res) => {
  const id = req.params['id']
  pizzas = pizzas.filter(item => item.id !== id)
  // Send back the newly added pizza
  res.status(201).json("deleted successfully!")
})



app.get('/api/filtered_pizza', (req, res) => {
  const filters = [];
  for (const [field, ops] of Object.entries(req.query)) {
    if (ops && typeof ops === 'object') {
      for (const op of ['like', 'equal']) {
        if (ops[op] != null) {
          filters.push(makePredicate(field, op, ops[op]));
        }
      }
    }
  }
  for (const key of Object.keys(req.query)) {
    const m = key.match(/^(\w+)\[(like|equal)\]$/);
    if (m) {
      const [, field, op] = m;
      filters.push(makePredicate(field, op, req.query[key]));
    }
  }
  const result = filters.length
    ? pizzas.filter(item => filters.every(fn => fn(item)))
    : pizzas;

  res.json(result);
});



app.get('/api/filtered_burgers', (req, res) => {
  const filters = [];
  for (const [field, ops] of Object.entries(req.query)) {
    if (ops && typeof ops === 'object') {
      for (const op of ['like', 'equal']) {
        if (ops[op] != null) {
          filters.push(makePredicate(field, op, ops[op]));
        }
      }
    }
  }
  for (const key of Object.keys(req.query)) {
    const m = key.match(/^(\w+)\[(like|equal)\]$/);
    if (m) {
      const [, field, op] = m;
      filters.push(makePredicate(field, op, req.query[key]));
    }
  }
  const result = filters.length
    ? burgers.filter(item => filters.every(fn => fn(item)))
    : burgers;

  res.json(result);
});

app.get('/api/filtered_pastas', (req, res) => {
  const filters = [];
  for (const [field, ops] of Object.entries(req.query)) {
    if (ops && typeof ops === 'object') {
      for (const op of ['like', 'equal']) {
        if (ops[op] != null) {
          filters.push(makePredicate(field, op, ops[op]));
        }
      }
    }
  }
  for (const key of Object.keys(req.query)) {
    const m = key.match(/^(\w+)\[(like|equal)\]$/);
    if (m) {
      const [, field, op] = m;
      filters.push(makePredicate(field, op, req.query[key]));
    }
  }
  const result = filters.length
    ? pastas.filter(item => filters.every(fn => fn(item)))
    : pastas;

  res.json(result);
});

function makePredicate(field, op, rawValue) {
  return item => {
    const val = item[field];
    if (val == null) return false;
    const str = val.toString();
    if (op === 'like') {
      // case‐insensitive substring
      return str.toLowerCase().includes(rawValue.toLowerCase());
    } else {
      // equal: numeric if original is number, otherwise string‐compare
      if (typeof val === 'number') {
        return val === Number(rawValue);
      }
      return str.toLowerCase() === rawValue.toLowerCase();
    }
  };
}

app.get('/api/rating', (req, res) => {
  const rating=  [
    {id: 'burger_5_1', type: 'burger', rating: 2},
    {id: 'burger_5_0', type: 'burger', rating: 3},
    {id: 'pasta_1_0', type: 'pasta', rating: 4},
    {id: 'pasta_0_1', type: 'pasta', rating: 5},
    {id: 'pizza_1_0', type: 'pizza', rating: 5},
    {id: 'pizza_0_2', type: 'pizza', rating: 3},
    {id: 'pizza_0_0', type: 'pizza', rating: 5}

  ]

  res.json(rating);
})



app.listen(PORT, () => {
  console.log(`✅ Mock API running at http://localhost:${PORT}`)
})
