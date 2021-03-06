import { Component, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MainService } from './main.service';
import { Task } from './common/Task';
import { Employee } from './common/Employee';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks$: Observable<Task[]> = this.mainService.tasks$;

  employees$: Observable<Employee[]> = this.mainService.employees$;

  currentEmployee$: Observable<Employee | undefined> = this.mainService.currentEmployee$;

  plannedTime$: Observable<number> = this.employees$.pipe(
    map((employees) => employees.reduce((res, { dailyAmount }) => res + dailyAmount, 0)),
  );

  spentTime$: Observable<number> = this.employees$.pipe(
    map((employees) => employees.reduce((res, { todaySpentTime }) => res + todaySpentTime, 0)),
  );

  neededTime$: Observable<number> = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status !== 'Completed')),
    map((tasks) =>
      tasks.reduce((res, { neededTime, spentTime }) => res + Math.abs(neededTime - spentTime), 0),
    ),
    switchMap((neededTime) =>
      this.spentTime$.pipe(map((employeeSpentTime) => employeeSpentTime + neededTime)),
    ),
  );

  constructor(private mainService: MainService, private matDialog: MatDialog) {}

  trackBy: TrackByFunction<Task> = (_, task) => task.id;

  ngOnInit(): void {}

  chooseEmployee(employee: Employee): void {
    this.mainService.setCurrentEmployee(employee);
  }

  createEmployee(): void {
    this.matDialog
      .open(CreateEmployeeDialogComponent)
      .afterClosed()
      .subscribe(() => this.mainService.resolve().subscribe());
  }

  isEmployeeOverPlanned(employee: Employee, tasks: Task[]): boolean {
    const employeeNeededTime = tasks
      .filter((task) => task.status !== 'Completed')
      .filter((task) => task.executorId === employee.id)
      .reduce((res, { neededTime, spentTime }) => res + Math.abs(neededTime - spentTime), 0);
    return employeeNeededTime > employee.dailyAmount - employee.todaySpentTime;
  }
}
