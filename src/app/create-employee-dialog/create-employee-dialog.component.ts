import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EmployeeApiService } from '../employee-api.service';
import { MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    private employeeApiService: EmployeeApiService,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.employeeApiService
      .createEmployee(this.name, this.workStart as number, this.workEnd as number)
      .subscribe(() => this.dialogRef.close());
  }
}
