import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportProgressDialogComponent } from '../report-progress-dialog/report-progress-dialog.component';
import { MainService } from '../main.service';
import { Task } from '../common/Task';
import { Observable } from 'rxjs';
import { Employee } from '../common/Employee';
import { map } from 'rxjs/operators';
import { TaskTagDialogComponent } from '../task-tag-dialog/task-tag-dialog.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;

  currentEmployeeId$: Observable<
    Employee['id'] | undefined
  > = this.mainService.currentEmployee$.pipe(map((employee) => employee?.id));

  isActionsAllowed$: Observable<boolean> = this.currentEmployeeId$.pipe(
    map(
      (employeeId) =>
        !!employeeId &&
        (this.task.status === 'Planned' ||
          this.task.status === 'Completed' ||
          employeeId === this.task.executorId),
    ),
  );

  constructor(private mainService: MainService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  takeTaskInWork(): void {
    this.mainService.takeTaskInWork(this.task.id).subscribe();
  }

  snoozeTask(): void {
    this.mainService.snoozeTask(this.task.id).subscribe();
  }

  completeTask(): void {
    this.mainService.completeTask(this.task.id).subscribe();
  }

  reportTimeProgress(): void {
    this.matDialog.open(ReportProgressDialogComponent, { data: this.task });
  }

  setTag(): void {
    this.matDialog.open(TaskTagDialogComponent, { data: this.task });
  }
}
