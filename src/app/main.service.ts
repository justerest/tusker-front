import { Injectable } from '@angular/core';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { TaskApiService } from './task-api.service';
import { EmployeeApiService } from './employee-api.service';
import { tap } from 'rxjs/operators';
import { Task } from './common/Task';
import { Employee } from './common/Employee';
import { assert } from './utils/assert';

@Injectable({ providedIn: 'root' })
export class MainService {
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject([] as Task[]);
  employees$: BehaviorSubject<Employee[]> = new BehaviorSubject([] as Employee[]);
  currentEmployee$: BehaviorSubject<Employee | undefined> = new BehaviorSubject(
    undefined as Employee | undefined,
  );

  constructor(
    private taskApiService: TaskApiService,
    private employeeApiService: EmployeeApiService,
  ) {}

  resolve(): Observable<unknown> {
    return merge(this.resolveTasks(), this.resolveEmployees());
  }

  private resolveTasks(): Observable<Task[]> {
    return this.taskApiService.getTasks().pipe(tap((tasks: Task[]) => this.tasks$.next(tasks)));
  }

  private resolveEmployees(): Observable<Employee[]> {
    return this.employeeApiService
      .getEmployees()
      .pipe(tap((employees) => this.employees$.next(employees)));
  }

  setCurrentEmployee(employee: Employee): void {
    this.currentEmployee$.next(employee);
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
}
