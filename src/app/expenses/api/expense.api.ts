import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Expense } from "@models/expense";
import { Period } from "@models/period";
import { Observable } from "rxjs";

import { config } from "../../core/config";
import { ConfigProvider } from "./../../core/config.provider";

@Injectable()
export class ExpenseApi {
  private readonly API_URL;

  constructor(private http: HttpClient, configProvider: ConfigProvider) {
    this.API_URL = configProvider.getConfig().apiUrl + '/expenses';
  }

  getExpenses(period: Period): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${this.API_URL}/?month=${period.month}&year=${period.year}`
    );
  }

  filterExpenses(period: Period, category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${this.API_URL}/?month=${period.month}&year=${period.year}&categoryName=${category}`
    );
  }

  createExpense(expense: Expense): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/`, expense);
  }

  updateExpense(expense: Expense): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${expense.id}`, expense);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
