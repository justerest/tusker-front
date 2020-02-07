import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../common/Task';
import { TagApiService, Tag } from '../api/tag-api.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './task-tag-dialog.component.html',
  styleUrls: ['./task-tag-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTagDialogComponent implements OnInit {
  tags$: Observable<Tag[]> = this.tagApiService.getTags();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public task: Task,
    private dialogRef: MatDialogRef<TaskTagDialogComponent>,
    private tagApiService: TagApiService,
  ) {}

  ngOnInit(): void {
    console.log(this.task);
  }

  setTag(tagId: Tag['id']): void {
    this.tagApiService.setTaskTag(this.task.id, tagId).subscribe(() => this.dialogRef.close());
  }
}
