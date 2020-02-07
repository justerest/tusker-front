import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../common/Task';
import { Identity } from '../common/Identity';

export interface Tag {
  id: Identity;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TagApiService {
  constructor(private httpClient: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(`/tag`);
  }

  setTaskTag(taskId: Task['id'], tagId: Tag['id']): Observable<unknown> {
    return this.httpClient.post(`/setTaskTag/${taskId}/${tagId}`, {});
  }
}
