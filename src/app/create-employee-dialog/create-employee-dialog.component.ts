import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../main.service';

@Component({
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeeDialogComponent implements OnInit {
  name = '';
  workStart: string | number = '';
  workEnd: string | number = '';

  constructor(
    private mainService: MainService,
    private dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.mainService
      .createEmployee(this.name, this.workStart as number, this.workEnd as number)
      .subscribe(() => this.dialogRef.close());
  }
}
