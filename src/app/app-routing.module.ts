import { EmployeeComponent } from './components/employee/employee.component';
import { IEmployee } from './interfaces/IEmployee';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { TableGuard } from './guards/table.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'table',
    component: EmployeeTableComponent,
    canActivate: [TableGuard],
    children: [
      { path: 'employee', redirectTo: '/employee', canActivate: [TableGuard] },
    ],
  },
  {
    path: 'employee/:id',
    component: EmployeeComponent,
    data: <IEmployee>{},
    canActivate: [TableGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
