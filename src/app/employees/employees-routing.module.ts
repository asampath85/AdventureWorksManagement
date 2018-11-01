import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { Route } from '../core/route.service';

const routes: Routes = Route.withShell( [
  { path: 'employeeList', component: EmployeeListComponent, canActivate: [AuthenticationGuard] }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
