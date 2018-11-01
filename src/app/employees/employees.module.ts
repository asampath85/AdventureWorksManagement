import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    TableModule
  ],
  declarations: [EmployeeListComponent]
})
export class EmployeesModule { }
