import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './common/Task';
import { Employee } from './common/Employee';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('/task');
  }

  createTask(title: string, plannedTime: number): Observable<unknown> {
    return this.httpClient.post('/task', { title, plannedTime });
  }

  takeTaskInWork(taskId: Task['id'], employeeId: Employee['id']): Observable<unknown> {
    return this.httpClient.post(`/takeTaskInWork/${taskId}/${employeeId}`, {});
  }

  snoozeTask(taskId: Task['id']): Observable<unknown> {
    return this.httpClient.post(`/snoozeTask/${taskId}`, {});
  }

  completeTask(taskId: Task['id']): Observable<unknown> {
    return this.httpClient.post(`/completeTask/${taskId}`, {});
  }

  reportTaskProgress(taskId: Task['id'], progress: number): Observable<unknown> {
    return this.httpClient.post(`/reportTaskProgress/${taskId}`, { progress });
  }
}
