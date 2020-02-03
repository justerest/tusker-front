import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board } from '../common/Board';

@Injectable({ providedIn: 'root' })
export class BoardApiService {
  constructor(private httpClient: HttpClient) {}

  getBoards(projectId: string): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`/board/${projectId}`);
  }

  createBoard(projectId: string): Observable<unknown> {
    return this.httpClient.post(`/board/${projectId}`, {});
  }

  incrementBoard(projectId: string): Observable<unknown> {
    return this.httpClient.post(`/incrementBoard/${projectId}`, {});
  }
}
