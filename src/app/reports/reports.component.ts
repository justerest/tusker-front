import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeReport, EmployeeApiService } from '../api/employee-api.service';
import { Subscription } from 'rxjs';
import { MainService } from '../main.service';
import { switchMap } from 'rxjs/operators';
import { uniq, groupBy } from 'lodash';

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  tags: string[] = [];
  dates: string[] = [];
  reportGroups: Record<string, Record<string, number>> = {};

  constructor(private mainService: MainService, private employeeApiService: EmployeeApiService) {}

  ngOnInit(): void {
    this.mainService.resolve().subscribe();
    this.subscription.add(
      this.mainService.currentEmployee$
        .pipe(
          switchMap((employee) =>
            employee ? this.employeeApiService.getReports(employee.id) : [[] as TimeReport[]],
          ),
        )
        .subscribe((reports) => {
          this.tags = uniq(reports.map((report) => report.tag || '')).sort();
          this.dates = uniq(reports.map((report) => `${report.date}`)).sort();
          this.reportGroups = this.getReportGroups(reports);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getReportGroups(reports: TimeReport[]): Record<string, Record<string, number>> {
    const tagGroups: any = groupBy(reports, (r) => r.tag || '');
    Object.keys(tagGroups).forEach((key) => {
      const tagDateGroup: any = groupBy(tagGroups[key], (r) => r.date);
      Object.keys(tagDateGroup).forEach(
        (date) => (tagDateGroup[date] = tagDateGroup[date][0].spentTime),
      );
      tagGroups[key] = tagDateGroup;
    });
    return tagGroups;
  }

  getTagTotal(tag: string): number {
    return Object.values(this.reportGroups[tag]).reduce((res, time) => res + time, 0);
  }
}
