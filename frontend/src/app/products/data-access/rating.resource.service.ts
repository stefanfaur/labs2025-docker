import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RatingResourceService {

  private readonly httpClient = inject(HttpClient);

  getRating() {
    return this.httpClient.get('http://localhost:3000/api/rating');
  }


}
