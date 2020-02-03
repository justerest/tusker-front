import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../common/Employee';
import { Board } from '../common/Board';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  constructor(private httpClient: HttpClient) {}

  getEmployees(boardId: Board['id']): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`/employee/${boardId}`);
  }

  createEmployee(
    boardId: Board['id'],
    name: string,
    workStart: number,
    workEnd: number,
  ): Observable<unknown> {
    return this.httpClient.post<Employee[]>(`/employee/${boardId}`, { name, workStart, workEnd });
  }
}
