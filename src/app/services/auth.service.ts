import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  user = new Subject();

  userList(model:User){
    return this.http.post(`${environment.baseApi}/user` , model)
  }
  getUserList(){
    return this.http.get(`${environment.baseApi}/user` )
  }
  login(model: any) {
    return this.http.put(`${environment.baseApi}/login/1`, model);
  }
  getUsers() {
    return this.http.get(`${environment.baseApi}/register`);
  }
  getDataUser() {
    return this.http.get(`${environment.baseApi}/login/1`);
  }
  getLocation(){
    return this.http.get('https://ipapi.co/json');
  }
}
