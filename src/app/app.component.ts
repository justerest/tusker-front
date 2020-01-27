import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService, Task } from './task.service';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { Subject, interval, merge } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private subject = new Subject();

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private matDialog: MatDialog) {}

  ngOnInit(): void {
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
    this.taskService.takeTaskInWork(taskId).subscribe(() => this.resolveTasks());
  }

  completeTask(taskId: Task['id']): void {
    this.taskService.completeTask(taskId).subscribe(() => this.resolveTasks());
  }
}
