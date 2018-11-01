import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { EmployeesModule } from 'src/app/employees/employees.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    EmployeesModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
