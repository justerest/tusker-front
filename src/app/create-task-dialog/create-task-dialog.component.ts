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

  constructor(
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.taskService.createTask(this.title).subscribe(() => this.dialogRef.close());
  }
}
