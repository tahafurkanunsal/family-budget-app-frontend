import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';
import { Spending } from 'src/model/Spending';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081/api/';

  constructor(private http: HttpClient) { }


  getAllUsers():  Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  create(user : User): Observable<any> {
    return this.http.post(`${this.baseUrl}users` , user);
  }
  updateUser(id?: number ,user?: User): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}users/${id}`, user)
  }
  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}users/${id}`)
  }
  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}users/${id}`)
  }
  getUserSpendings(id: number): Observable<Spending[]> {
    return this.http.get<Spending[]>(`${this.baseUrl}users/${id}/spendings`);
  }
  findUserWithHighestTotalSpend(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/most-spending`);
  }
}
