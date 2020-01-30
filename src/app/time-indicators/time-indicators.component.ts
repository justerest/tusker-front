import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-time-indicators',
  templateUrl: './time-indicators.component.html',
  styleUrls: ['./time-indicators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeIndicatorsComponent implements OnInit {
  @Input() plannedTime!: number;
  @Input() neededTime!: number;
  @Input() spentTime!: number;

  constructor() {}

  ngOnInit() {}
}
