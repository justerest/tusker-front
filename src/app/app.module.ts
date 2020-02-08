import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TimePipe } from './time.pipe';
import { ReportProgressDialogComponent } from './report-progress-dialog/report-progress-dialog.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TimeProgressComponent } from './time-progress/time-progress.component';
import { TimeIndicatorsComponent } from './time-indicators/time-indicators.component';
import { BaseUrlInterceptor, BASE_URL } from './base-url.interceptor';
import { GlobalTimeProgressComponent } from './global-time-progress/global-time-progress.component';
import { environment } from 'src/environments/environment';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';
import { BoardNavigationComponent } from './board-navigation/board-navigation.component';
import { TaskTagDialogComponent } from './task-tag-dialog/task-tag-dialog.component';
import { BoardComponent } from './board/board.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskDialogComponent,
    ReportProgressDialogComponent,
    TimePipe,
    TaskCardComponent,
    TimeProgressComponent,
    TimeIndicatorsComponent,
    GlobalTimeProgressComponent,
    CreateEmployeeDialogComponent,
    BoardNavigationComponent,
    TaskTagDialogComponent,
    BoardComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: ':projectId',
        component: BoardComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'general',
      },
    ]),
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
