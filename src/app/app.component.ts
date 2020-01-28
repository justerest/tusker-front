import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './task.service';
import { Task } from './Task';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { Subject, interval, merge } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private subject = new Subject();

  tasks: Task[] = [];
  employees: Employee[] = [];

  currentEmployee: Employee;

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.currentEmployee = employees[0];
    });
    merge(interval(10_000), this.subject)
      .pipe(exhaustMap(() => this.taskService.getTasks()))
      .subscribe((tasks) => (this.tasks = tasks));
    this.resolveTasks();
  }

  private resolveTasks() {
    this.subject.next();
  }

  createTask(): void {
    this.matDialog
      .open(CreateTaskDialogComponent, { width: '250px' })
      .afterClosed()
      .subscribe(() => this.resolveTasks());
  }

  takeTaskInWork(taskId: Task['id']): void {
    if (this.currentEmployee) {
      this.taskService
        .takeTaskInWork(taskId, this.currentEmployee.id)
        .subscribe(() => this.resolveTasks());
    }
  }

  snoozeTask(taskId: Task['id']): void {
    this.taskService.snoozeTask(taskId).subscribe(() => this.resolveTasks());
  }

  completeTask(taskId: Task['id']): void {
    this.taskService.completeTask(taskId).subscribe(() => this.resolveTasks());
  }
}
