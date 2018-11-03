import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    NgbModule
  ],
  declarations: [EmployeeListComponent, EmployeeDetailComponent]
})
export class EmployeesModule { }
