import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { Role } from './auth/model/roles';
import { AuthGuard } from './utils/auth.guard';
import { AdminComponent } from './auth/admin/admin.component';
import { DashComponent } from './dash/dash.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { PasswordupdateComponent } from './auth/passwordupdate/passwordupdate.component';
import { UpdatedetailComponent } from './auth/updatedetail/updatedetail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.admin] }
},
  { path: 'dashboard', component: DashComponent, canActivate: [AuthGuard], },
  { path: 'updatedetail', component: UpdatedetailComponent },
  { path: 'password', component: PasswordupdateComponent },
  { path: 'forgot', component: ForgotComponent },
  // otherwise redirect to home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
