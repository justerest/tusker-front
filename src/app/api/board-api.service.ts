import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board } from '../common/Board';
import { Identity } from '../common/Identity';

@Injectable({ providedIn: 'root' })
export class BoardApiService {
  constructor(private httpClient: HttpClient) {}

  getBoards(projectId: Identity): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`/board/${projectId}`);
  }

  completeBoardAndNext(projectId: Identity): Observable<unknown> {
    return this.httpClient.post(`/board/${projectId}`, {});
  }
}
