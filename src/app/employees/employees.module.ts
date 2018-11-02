import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import {TableModule} from 'primeng/table';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    TableModule
  ],
  declarations: [EmployeeListComponent, EmployeeDetailComponent]
})
export class EmployeesModule { }
