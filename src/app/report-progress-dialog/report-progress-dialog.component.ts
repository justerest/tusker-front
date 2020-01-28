import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../Task';

@Component({
  templateUrl: './report-progress-dialog.component.html',
  styleUrls: ['./report-progress-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportProgressDialogComponent implements OnInit {
  progress: string | number = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public task: Task,
    private dialogRef: MatDialogRef<ReportProgressDialogComponent>,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    console.log(this.task);
  }

  report(): void {
    this.taskService
      .reportTaskProgress(this.task.id, this.progress as number)
      .subscribe(() => this.dialogRef.close());
  }
}
