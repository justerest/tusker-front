import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Identity = string | number;

export interface Task {
  id: Identity;
  title: string;
  status: string;
  spentTime: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('http://localhost:3000/task');
  }

  createTask(title: string): Observable<unknown> {
    return this.httpClient.post('http://localhost:3000/task', { title });
  }

  takeTaskInWork(taskId: Task['id']): Observable<unknown> {
    return this.httpClient.post(`http://localhost:3000/task/${taskId}/takeInWork/employeeId`, {});
  }

  completeTask(taskId: Task['id']): Observable<unknown> {
    return this.httpClient.post(`http://localhost:3000/task/${taskId}/complete`, {});
  }
}
