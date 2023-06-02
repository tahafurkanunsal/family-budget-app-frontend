import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spending } from 'src/model/Spending';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  private baseUrl = 'http://localhost:8081/api/';

  constructor(private http: HttpClient) { }

  getAllSpendings(): Observable<Spending[]>{
    return this.http.get<Spending[]>(`${this.baseUrl}spendings`);
  }

  createSpending(spending : Spending): Observable<any>{
    return this.http.post(`${this.baseUrl}spendings` , spending);
  }

  deleteSpending(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}spendings/${id}`);
  }

  getSpendingsByDate(startDate: string, endDate: string): Observable<Spending[]> {
    const formattedStartDate = formatDate(startDate, 'yyyy-MMM-dd', 'tr-TR');
    const formattedEndDate = formatDate(endDate, 'yyyy-MMM-dd', 'tr-TR');
    const apiUrl = `${this.baseUrl}spendings?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
  
    return this.http.get<Spending[]>(apiUrl);
  }
}
