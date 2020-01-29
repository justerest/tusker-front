import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './common/Employee';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:3000/employee');
  }
}
