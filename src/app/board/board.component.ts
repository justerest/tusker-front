import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { Task } from '../common/Task';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { MainService } from '../main.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private mainService: MainService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const { projectId = 'general' } = this.activatedRoute.snapshot.params;
    interval(5_000)
      .pipe(startWith(0))
      .subscribe(() => this.mainService.resolve(projectId).subscribe());
  }

  createTask(): void {
    this.matDialog
      .open(CreateTaskDialogComponent)
      .afterClosed()
      .subscribe(() => this.mainService.resolve().subscribe());
  }
}
