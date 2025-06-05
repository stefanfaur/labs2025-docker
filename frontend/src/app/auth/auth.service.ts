import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient)

  isLoggedIn() {
    return this.httpClient.get<boolean>('http://localhost:3000/api/auth')
  }
}
