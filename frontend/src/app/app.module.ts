import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './Component/Admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { FacultyDashboardComponent } from './Component/Faculty/faculty-dashboard/faculty-dashboard.component';
import { FacultyLoginComponent } from './Component/Faculty/faculty-login/faculty-login.component';
import { FacultyDataComponent } from './Component/Admin/admin-dashboard/faculty-data/faculty-data.component';
import { StudentDataComponent } from './Component/Admin/admin-dashboard/student-data/student-data.component';
import { TrainerDataComponent } from './Component/Admin/admin-dashboard/trainer-data/trainer-data.component';
import { OverviewComponent } from './Component/Admin/admin-dashboard/overview/overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingComponent } from './Component/Faculty/faculty-dashboard/training/training.component';
import { ProfileComponent } from './Component/Faculty/faculty-dashboard/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    FacultyDashboardComponent,
    FacultyLoginComponent,
    FacultyDataComponent,
    StudentDataComponent,
    TrainerDataComponent,
    OverviewComponent,
    TrainingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
