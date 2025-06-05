import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {PizzaModel} from '../../../pizzas/domain/pizza.model';
import {BurgerModel} from '../../domain/burger.model';
import {ProductModel} from '../../domain/product.model';
import {computed, inject} from '@angular/core';
import {PizzaResourceService} from '../../data-access/pizza-resource.service';
import {debounceTime, map, pipe, switchMap, tap} from 'rxjs';
import {PastaModel} from '../../domain/pasta.model';
import {BurgerResourceService} from '../../data-access/burger-resource.service';
import {PastaResourceService} from '../../data-access/pasta-resource.service';
import {ProductFilter} from '../../domain/product-filters.model';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {SortConfig} from '../sort/sort.component';
import {createSorter} from '../../utils/utils-sort';
import {RatingResourceService} from '../../data-access/rating.resource.service';


export const featureProductListStore = signalStore(
  withState({
    loading: 0,
    pizzas: [] as PizzaModel[],
    burgers: [] as BurgerModel[],
    pasta: [] as PastaModel[],
    filters: null as ProductFilter | null,
    sortConfig: {field: 'title', direction: 'asc'} as SortConfig,
    ratings: {} as Record<string, number>
  }),

  withComputed((state) => ({
    pizzasAsProducts: computed<ProductModel[]>(() => {
      return state.pizzas().map(pizza => {
        return {
          id: pizza.id,
          imageUrl: pizza.imageUrl,
          title: pizza.name,
          description: pizza.description,
          price: pizza.price,
          rating: 0,
          type: 'pizza'
        }
      })
    }),
    burgersAsProducts: computed<ProductModel[]>(() => {
      return state.burgers().map(burger => {
        return {
          id: burger.id,
          imageUrl: burger.imageUrl,
          title: burger.title,
          description: burger.description,
          price: burger.price,
          rating: 0,
          type: 'burger'
        }
      })
    }),
    pastasAsProducts: computed<ProductModel[]>(() => {
      return state.pasta().map(pasta => {
        return {
          id: pasta.id,
          imageUrl: pasta.imageUrl,
          title: pasta.title,
          description: pasta.description,
          price: pasta.price,
          rating: 0,
          type: 'pasta'
        }
      })
    })

  })),

  withComputed((state) => ({
    products: computed<ProductModel[]>(() => {
      return [...state.pizzasAsProducts(), ...state.burgersAsProducts(), ...state.pastasAsProducts()]
        .map(product => {
          return {
            ...product,
            rating: state.ratings()[product.id] || 0
          }
        })
        .sort(createSorter(state.sortConfig()))
    })
  })),

  withMethods((state, pizzaService = inject(PizzaResourceService), burgerService = inject(BurgerResourceService), pastaService = inject(PastaResourceService), rating = inject(RatingResourceService)) => ({
    loadPizzas: rxMethod< ProductFilter | null>(
      pipe(
        debounceTime(300),
        tap(() => {patchState(state, {loading : state.loading() + 1})}),
        switchMap(filters => pizzaService.getAllPizzas(filters || undefined)),
        tap(data => {
          patchState(state, {
            loading: state.loading() - 1,
            pizzas: data
          })
        }),
      )
    ),

    loadBurgers: rxMethod< ProductFilter | null>(
      pipe(
        debounceTime(300),
        map(filters => {
          if (filters) {
            return {
              ...filters,
              title: filters['name'],
              name: {...filters['name'], value: null}
            }
          }
          return filters
        }),
        tap(() => {patchState(state, {loading : state.loading() + 1})}),
        switchMap(filters => burgerService.getAllBurgers(filters || undefined)),
        tap(data => {
          patchState(state, {
            loading: state.loading() - 1,
            burgers: data
          })
        }),
      )
    ),
    loadPastas: rxMethod<ProductFilter | null>(pipe(
        debounceTime(300),
      map(filters => {
        if (filters) {
          return {
            ...filters,
            title: filters['name'],
            name: {...filters['name'], value: null}
          }
        }
        return filters
      }),
        tap(() => {patchState(state, {loading : state.loading() + 1})}),
        switchMap(filters => pastaService.getAllPastas(filters || undefined)),
        tap(data => {
          patchState(state, {
            loading: state.loading() - 1,
            pasta: data
          })
        }),
      )
    ),
    loadRatings: () => {
      rating.getRating().pipe(tap(ratings  => {
        patchState(state, {ratings: (<any[]>ratings).reduce((acc, rating) => ({ ...acc, [rating.id]: rating.rating  }))
      })})).subscribe()
    },
    updateFilters: (filters: ProductFilter) => {
      patchState(state, {filters: filters})
    },
    updateSort: (sortConfig: SortConfig) => {
      let s = sortConfig;
      if(sortConfig.field === 'name') {
        s = {...sortConfig , field: 'title'}
      }
      patchState(state, {sortConfig: s})
    }
  })),
  withHooks({
    onInit(store) {
      store.loadPizzas(store.filters)
      store.loadBurgers(store.filters)
      store.loadPastas(store.filters)
    }
  })
)
