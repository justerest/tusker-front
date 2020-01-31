import { Component, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { interval, Observable } from 'rxjs';
import { startWith, map, shareReplay, switchMap } from 'rxjs/operators';
import { MainService } from './main.service';
import { Task } from './common/Task';
import { Employee } from './common/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks$: Observable<Task[]> = this.mainService.tasks$.pipe(
    map((tasks) => tasks.slice().reverse()),
    shareReplay(1),
  );
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

  ngOnInit(): void {
    interval(5_000)
      .pipe(startWith(0))
      .subscribe(() => this.mainService.resolve().subscribe());
  }

  changeEmployee(employee: Employee): void {
    this.mainService.setCurrentEmployee(employee);
  }

  createTask(): void {
    this.matDialog
      .open(CreateTaskDialogComponent, { width: '250px' })
      .afterClosed()
      .subscribe(() => this.mainService.resolve().subscribe());
  }
}
