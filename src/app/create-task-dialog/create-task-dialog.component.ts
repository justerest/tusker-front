import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../main.service';

@Component({
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent implements OnInit {
  title = '';
  plannedTime: string | number = '';

  constructor(
    private mainService: MainService,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.mainService
      .createTask(this.title, this.plannedTime as number)
      .subscribe(() => this.dialogRef.close());
  }
}
