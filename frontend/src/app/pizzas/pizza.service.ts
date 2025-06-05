import {Injectable, signal} from '@angular/core';
import {PizzaModel} from './domain/pizza.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private pizzas = signal<PizzaModel[]>([])

  constructor(private httpClient: HttpClient) {
    this.fetchPizzas();
  }

  private fetchPizzas() {
    this.httpClient.get<PizzaModel[]>('http://localhost:3000/api/pizzas').subscribe(pizzas => this.pizzas.set(pizzas))
  }

  getPizzas() {
    return this.pizzas
  }

  saveOrUpdatePizza(pizza: PizzaModel) {
    this.httpClient.post('http://localhost:3000/api/pizzas', pizza).subscribe(_=>this.fetchPizzas())
  }

  deletePizza(pizza: PizzaModel) {
    this.httpClient.delete(`http://localhost:3000/api/pizzas/${pizza.id}`).subscribe(_=>this.fetchPizzas())
  }
}
