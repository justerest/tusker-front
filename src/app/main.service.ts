import { Injectable } from '@angular/core';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { TaskApiService } from './task-api.service';
import { EmployeeApiService } from './employee-api.service';
import { tap } from 'rxjs/operators';
import { Task } from './common/Task';
import { Employee } from './common/Employee';

@Injectable({ providedIn: 'root' })
export class MainService {
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  employees$: BehaviorSubject<Employee[]> = new BehaviorSubject([]);
  currentEmployee$: BehaviorSubject<Employee> = new BehaviorSubject(null as any);

  constructor(
    private taskApiService: TaskApiService,
    private employeeApiService: EmployeeApiService,
  ) {}

  resolve(): Observable<unknown> {
    return merge(
      this.taskApiService.getTasks().pipe(tap((tasks: Task[]) => this.tasks$.next(tasks))),
      this.employeeApiService.getEmployees().pipe(
        tap((employees) => {
          this.currentEmployee$.next(this.currentEmployee$.value || employees[0]);
          this.employees$.next(employees);
        }),
      ),
    );
  }

  setCurrentEmployee(employee: Employee): void {
    this.currentEmployee$.next(employee);
  }

  takeTaskInWork(taskId: Task['id']): Observable<unknown> {
    return this.taskApiService
      .takeTaskInWork(taskId, this.currentEmployee$.value.id)
      .pipe(tap(() => this.resolve().subscribe()));
  }

  snoozeTask(taskId: Task['id']): Observable<unknown> {
    return this.taskApiService.snoozeTask(taskId).pipe(tap(() => this.resolve().subscribe()));
  }

  completeTask(taskId: Task['id']): Observable<unknown> {
    return this.taskApiService.completeTask(taskId).pipe(tap(() => this.resolve().subscribe()));
  }
}
