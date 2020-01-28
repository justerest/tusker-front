import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent implements OnInit {
  title = '';
  plannedTime: string | number = '';

  constructor(
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.taskService
      .createTask(this.title, this.plannedTime as number)
      .subscribe(() => this.dialogRef.close());
  }
}
