import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './Task';
import { Employee } from './Employee';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:3000/task');
  }

  createTask(title: string): Observable<unknown> {
    return this.httpClient.post('http://localhost:3000/task', { title });
  }

  takeTaskInWork(taskId: Task['id'], employeeId: Employee['id']): Observable<unknown> {
    return this.httpClient.post(`http://localhost:3000/takeTaskInWork/${taskId}/${employeeId}`, {});
  }

  completeTask(taskId: Task['id']): Observable<unknown> {
    return this.httpClient.post(`http://localhost:3000/completeTask/${taskId}`, {});
  }
}
