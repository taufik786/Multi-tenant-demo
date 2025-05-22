import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api = 'http://localhost:5000/user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserLayout(type: any) {
    return this.http.get(api + 'layout/' + type);
  }
  addRoutes(data: any) {
    return this.http.post<any>(api + 'routes', data);
  }
  addForm(data: any) {
    return this.http.post<any>(api + 'create-form', data);
  }
  getForm(type: any) {
    return this.http.get(api + 'get-form/' + type);
  }
}
