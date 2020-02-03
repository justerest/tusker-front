import { Injectable } from '@angular/core';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { TaskApiService } from './api/task-api.service';
import { EmployeeApiService } from './api/employee-api.service';
import { tap, switchMap } from 'rxjs/operators';
import { Task } from './common/Task';
import { Employee } from './common/Employee';
import { assert } from './utils/assert';
import { Board } from './common/Board';
import { BoardApiService } from './api/board-api.service';

@Injectable({ providedIn: 'root' })
export class MainService {
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject([] as Task[]);
  employees$: BehaviorSubject<Employee[]> = new BehaviorSubject([] as Employee[]);
  currentEmployee$: BehaviorSubject<Employee | undefined> = new BehaviorSubject(
    undefined as Employee | undefined,
  );

  private boards!: Board[];
  private currentBoardId!: Board['id'];

  private get projectId(): string {
    return location.href.split('/').pop() || '';
  }

  constructor(
    private boardApiService: BoardApiService,
    private taskApiService: TaskApiService,
    private employeeApiService: EmployeeApiService,
  ) {}

  async nextBoard(): Promise<void> {
    const currentIndex = this.boards.findIndex((board) => board.id === this.currentBoardId);
    if (currentIndex === this.boards.length - 1) {
      await this.boardApiService.createBoard(this.projectId).toPromise();
      await this.resolveBoards().toPromise();
    }
    this.currentBoardId = this.boards[currentIndex + 1].id;
    await this.resolve().toPromise();
  }

  todayBoard(): void {
    this.currentBoardId = this.boards.find((board) => !board.completed)!.id;
    this.resolve().subscribe();
  }

  prevBoard(): void {
    const currentIndex = this.boards.findIndex((board) => board.id === this.currentBoardId);
    this.currentBoardId = this.boards[currentIndex - 1].id;
    this.resolve().subscribe();
  }

  resolve(): Observable<unknown> {
    return this.resolveBoards().pipe(
      tap(() => {
        if (!this.currentBoardId) {
          this.currentBoardId = this.boards.find((board) => !board.completed)!.id;
        }
      }),
      switchMap(() => merge(this.resolveTasks(), this.resolveEmployees())),
    );
  }

  private resolveBoards(): Observable<unknown> {
    return this.boardApiService
      .getBoards(this.projectId)
      .pipe(tap((boards) => (this.boards = boards)));
  }

  private resolveTasks(): Observable<Task[]> {
    return this.taskApiService
      .getTasks(this.currentBoardId)
      .pipe(tap((tasks: Task[]) => this.tasks$.next(tasks)));
  }

  private resolveEmployees(): Observable<Employee[]> {
    return this.employeeApiService
      .getEmployees(this.currentBoardId)
      .pipe(tap((employees) => this.employees$.next(employees)));
  }

  createEmployee(name: string, startAt: number, endAt: number): Observable<unknown> {
    return this.employeeApiService.createEmployee(this.currentBoardId, name, startAt, endAt);
  }

  setCurrentEmployee(employee: Employee): void {
    this.currentEmployee$.next(employee);
  }

  createTask(title: string, plannedTime: number): Observable<unknown> {
    return this.taskApiService.createTask(this.currentBoardId, title, plannedTime);
  }

  takeTaskInWork(taskId: Task['id']): Observable<unknown> {
    assert(this.currentEmployee$.value, 'No current employee');
    return this.taskApiService
      .takeTaskInWork(taskId, this.currentEmployee$.value.id)
      .pipe(tap(() => this.resolveTasks().subscribe()));
  }

  snoozeTask(taskId: Task['id']): Observable<unknown> {
    return this.taskApiService.snoozeTask(taskId).pipe(tap(() => this.resolveTasks().subscribe()));
  }

  completeTask(taskId: Task['id']): Observable<unknown> {
    return this.taskApiService
      .completeTask(taskId)
      .pipe(tap(() => this.resolveTasks().subscribe()));
  }

  completeBoard(): Observable<unknown> {
    return this.boardApiService
      .incrementBoard(this.projectId)
      .pipe(tap(() => this.resolve().subscribe()));
  }
}
