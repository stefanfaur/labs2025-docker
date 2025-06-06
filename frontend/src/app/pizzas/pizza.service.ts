import {Injectable, signal} from '@angular/core';
import {PizzaModel} from './domain/pizza.model';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../lib/api-base-url';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private pizzas = signal<PizzaModel[]>([]);
  private baseUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) {
    this.fetchPizzas();
  }

  private fetchPizzas() {
    this.httpClient.get<any[]>(`${this.baseUrl}/pizza`).subscribe(pizzas => {
      const mappedPizzas = pizzas.map(p => this.mapBackendToFrontend(p));
      this.pizzas.set(mappedPizzas);
    });
  }

  private mapBackendToFrontend(backendPizza: any): PizzaModel {
    return {
      id: backendPizza.id.toString(),
      name: backendPizza.name,
      description: backendPizza.description || '',
      imageUrl: backendPizza.imageUrl || '/pizza_placeholder.png',
      price: backendPizza.currencyValue?.price || 0,
      ingredients: backendPizza.ingredients ? backendPizza.ingredients.split(',') : [],
      hotness: backendPizza.hotness || 0
    };
  }

  private mapFrontendToBackend(frontendPizza: PizzaModel): any {
    const backendPizza: any = {
      name: frontendPizza.name,
      description: frontendPizza.description,
      imageUrl: frontendPizza.imageUrl,
      ingredients: frontendPizza.ingredients.join(','),
      hotness: frontendPizza.hotness,
      price: frontendPizza.price,
      currency: 'RON'
    };

    // Include ID if it's a valid numeric ID (for updates)
    if (frontendPizza.id && frontendPizza.id !== 'new' && !isNaN(Number(frontendPizza.id))) {
      backendPizza.id = Number(frontendPizza.id);
    }

    return backendPizza;
  }

  getPizzas() {
    return this.pizzas;
  }

  saveOrUpdatePizza(pizza: PizzaModel) {
    const backendPizza = this.mapFrontendToBackend(pizza);

    // Always use POST now, let the backend decide based on ID presence
    this.httpClient.post(`${this.baseUrl}/pizza`, backendPizza).subscribe(() => this.fetchPizzas());
  }

  deletePizza(pizza: PizzaModel) {
    this.httpClient.delete(`${this.baseUrl}/pizza/${pizza.id}`).subscribe(() => this.fetchPizzas());
  }
}
