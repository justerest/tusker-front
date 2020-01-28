import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './task.service';
import { Task } from './Task';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { Subject, interval, merge, forkJoin } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';
import { ReportProgressDialogComponent } from './report-progress-dialog/report-progress-dialog.component';

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
    merge(interval(5_000), this.subject)
      .pipe(
        exhaustMap(() =>
          forkJoin([this.taskService.getTasks(), this.employeeService.getEmployees()]),
        ),
      )
      .subscribe(([tasks, employees]) => {
        this.tasks = tasks;
        this.employees = employees;
      });
    this.resolveData();
  }

  private resolveData() {
    this.subject.next();
  }

  createTask(): void {
    this.matDialog
      .open(CreateTaskDialogComponent, { width: '250px' })
      .afterClosed()
      .subscribe(() => this.resolveData());
  }

  takeTaskInWork(taskId: Task['id']): void {
    if (this.currentEmployee) {
      this.taskService
        .takeTaskInWork(taskId, this.currentEmployee.id)
        .subscribe(() => this.resolveData());
    }
  }

  snoozeTask(taskId: Task['id']): void {
    this.taskService.snoozeTask(taskId).subscribe(() => this.resolveData());
  }

  completeTask(taskId: Task['id']): void {
    this.taskService.completeTask(taskId).subscribe(() => this.resolveData());
  }

  reportTimeProgress(task: Task): void {
    this.matDialog
      .open(ReportProgressDialogComponent, { data: task, width: '250px' })
      .afterClosed()
      .subscribe(() => this.resolveData());
  }
}
