import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../common/Task';
import { map, shareReplay } from 'rxjs/operators';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { MainService } from '../main.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  tasks$: Observable<Task[]> = this.mainService.tasks$.pipe(
    map((tasks) => tasks.slice().reverse()),
    shareReplay(1),
  );

  trackBy: TrackByFunction<Task> = (_, task) => task.id;

  constructor(private mainService: MainService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  createTask(): void {
    this.matDialog
      .open(CreateTaskDialogComponent)
      .afterClosed()
      .subscribe(() => this.mainService.resolve().subscribe());
  }
}
