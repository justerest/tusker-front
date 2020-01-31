import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
