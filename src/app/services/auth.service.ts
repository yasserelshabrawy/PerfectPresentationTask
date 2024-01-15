import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  user = new Subject();

  login(model: Login) {
    return this.http.put(`${environment.baseApi}/login/1`, model);
  }
  getUsers() {
    return this.http.get(`${environment.baseApi}/register`);
  }
  authLogin(){
    return localStorage.getItem('token')
  }

}
