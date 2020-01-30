import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-time-progress',
  templateUrl: './time-progress.component.html',
  styleUrls: ['./time-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeProgressComponent implements OnInit {
  @Input() plannedTime!: number;
  @Input() neededTime!: number;
  @Input() spentTime!: number;

  constructor() {}

  ngOnInit() {}
}
