import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userList(model: User) {
    return this.http.post(`${environment.baseApi}/user`, model);
  }
  getUserList() {
    return this.http.get(`${environment.baseApi}/user`);
  }
  getDataUser() {
    return this.http.get(`${environment.baseApi}/login/1`);
  }
  getLocation() {
    return this.http.get('https://ipapi.co/json');
  }
  deleteUser(id: string) {
    return this.http.delete(`${environment.baseApi}/user/${id}`);
  }
  updateUser(model: User, id: string) {
    return this.http.put(`${environment.baseApi}/user/${id}`, model);
  }
}
