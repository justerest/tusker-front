import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../common/Task';
import { Employee } from '../common/Employee';
import { Board } from '../common/Board';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  constructor(private httpClient: HttpClient) {}

  getTasks(boardId: Board['id']): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`/task/${boardId}`);
  }

  createTask(boardId: Board['id'], title: string, plannedTime: number): Observable<unknown> {
    return this.httpClient.post(`/task/${boardId}`, { title, plannedTime });
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
