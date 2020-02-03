import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Board } from '../common/Board';

@Injectable({ providedIn: 'root' })
export class BoardApiService {
  constructor(private httpClient: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>(`/board`);
  }

  createBoard(): Observable<unknown> {
    return this.httpClient.post(`/board`, {});
  }
}
