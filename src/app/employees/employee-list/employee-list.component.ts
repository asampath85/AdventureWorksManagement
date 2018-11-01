import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeModel } from '../models/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  private employees: EmployeeModel[];

  cols: any[];

  constructor(private employeeService: EmployeeService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployee().subscribe(
      empList => {
        this.employees = empList;
        this.toastrService.success('Employee details loaded..', 'EMPLYEE DETAILS');
      },
      error => {
        this.toastrService.error(error, 'ERROR');
      }
    );

    this.loadEmployeeTable();
  }

  loadEmployeeTable() {
    this.cols = [
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'jobTitle', header: 'Job Title'},
      {field: 'birthDate', header: 'Birth Date'},
      // {field: 'hireDate', header: 'Hire Date'},
      // {field: 'nationalIDNumber', header: 'National ID'},
    ];
  }

}
