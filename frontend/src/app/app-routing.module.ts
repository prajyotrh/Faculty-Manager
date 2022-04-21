import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Component/Admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { FacultyDashboardComponent } from './Component/Faculty/faculty-dashboard/faculty-dashboard.component';
import { FacultyLoginComponent } from './Component/Faculty/faculty-login/faculty-login.component';

const routes: Routes = [
  {path:'', redirectTo:'faculty/login', pathMatch:'full'},
  {path:'faculty/login', component:FacultyLoginComponent},
  {path:'faculty/dashboard', component:FacultyDashboardComponent},

  {path:'admin', redirectTo:'admin/login', pathMatch:'full'},
  {path:'admin/login', component:AdminLoginComponent},
  {path:'admin/dashboard', component:AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
