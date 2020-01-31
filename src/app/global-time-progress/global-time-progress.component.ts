import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-global-time-progress',
  templateUrl: './global-time-progress.component.html',
  styleUrls: ['./global-time-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalTimeProgressComponent implements OnInit {
  @Input() plannedTime!: number;
  @Input() neededTime!: number;
  @Input() spentTime!: number;

  get primary(): number {
    return this.getPlannedProgress() - this.overdue;
  }

  get overdue(): number {
    return this.getPlannedProgress() - this.getNeededProgress() - this.getOverdueProgress();
  }

  constructor() {}

  ngOnInit(): void {}

  private getPlannedProgress(): number {
    return (this.spentTime / this.plannedTime) * 100;
  }

  private getNeededProgress() {
    return (this.spentTime / this.neededTime) * 100;
  }

  private getOverdueProgress(): number {
    return this.spentTime > this.plannedTime
      ? ((this.spentTime - this.plannedTime) / (this.neededTime - this.plannedTime)) * 100
      : 0;
  }
}
