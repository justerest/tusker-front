import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../common/Task';
import { TaskApiService } from '../api/task-api.service';

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
    private taskApiService: TaskApiService,
  ) {}

  ngOnInit(): void {
    console.log(this.task);
  }

  report(): void {
    this.taskApiService
      .reportTaskProgress(this.task.id, this.progress as number)
      .subscribe(() => this.dialogRef.close());
  }
}
