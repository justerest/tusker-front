import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../common/Board';
import { BoardApiService } from '../api/board-api.service';
import { Identity } from '../common/Identity';
import { tap } from 'rxjs/operators';
import { assert } from '../utils/assert';

@Injectable({ providedIn: 'root' })
export class BoardNavigationService {
  private currentBoardIndex = -1;

  boards!: Board[];
  currentBoardId!: Identity;

  get resolved(): boolean {
    return !!this.boards;
  }

  constructor(private boardApiService: BoardApiService) {}

  resolve(projectId: Identity): Observable<unknown> {
    return this.boardApiService.getBoards(projectId).pipe(
      tap((boards) => {
        this.boards = boards;
        if (this.currentBoardIndex === -1) {
          this.toActive();
        }
      }),
    );
  }

  getActiveBoard(): Board {
    const activeBoard = this.boards.find((board) => !board.completed);
    assert(activeBoard, 'No active board in project');
    return activeBoard;
  }

  getCurrentBoard(): Board {
    return this.boards[this.currentBoardIndex];
  }

  hasNext(): boolean {
    return this.currentBoardIndex < this.boards.length - 1;
  }

  hasPrev(): boolean {
    return this.currentBoardIndex > 0;
  }

  next(): void {
    assert(this.hasNext(), 'It is the last board');
    this.currentBoardIndex++;
    this.currentBoardId = this.getCurrentBoard().id;
  }

  prev(): void {
    assert(this.hasPrev(), 'It is the first board');
    this.currentBoardIndex--;
    this.currentBoardId = this.getCurrentBoard().id;
  }

  toActive(): void {
    const activeBoardIndex = this.boards.findIndex((board) => !board.completed);
    assert(activeBoardIndex !== -1, 'No active board in project');
    this.currentBoardIndex = activeBoardIndex;
    this.currentBoardId = this.getCurrentBoard().id;
  }
}
