import { Component, OnInit, TrackByFunction } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { interval, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MainService } from './main.service';
import { Task } from './common/Task';
import { Employee } from './common/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks$: Observable<Task[]> = this.mainService.tasks$;
  employees$: Observable<Employee[]> = this.mainService.employees$;
  currentEmployee$: Observable<Employee> = this.mainService.currentEmployee$;

  trackBy: TrackByFunction<Task> = (_, task) => task.id;

  constructor(private mainService: MainService, private matDialog: MatDialog) {}

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
