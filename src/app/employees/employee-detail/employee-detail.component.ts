import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employeeForm: FormGroup;
  private _employeeDetail: EmployeeModel;

  @Input()
  set employeeDetail(employeeDetail: EmployeeModel) {
    this._employeeDetail = employeeDetail;
    this.initializeEmployeeDetail();
  }

  @Output() saveEmployeeDetail: EventEmitter<EmployeeModel> = new EventEmitter<EmployeeModel>();

  @Output() cancelEmployeeDetail: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      loginID: '',
      hireDate: '',
      birthDate: '',
      nationalIDNumber: '',
      jobTitle: '',
      gender: 'M',
      maritalStatus: 'M',
      salariedFlag: true,
      currentFlag: true,
      vacationHours: '',
      sickLeaveHours: ''
    });
  }

  initializeEmployeeDetail() {
    if (this._employeeDetail !== undefined) {
      this.employeeForm.patchValue({
        firstName: this._employeeDetail.firstName,
        lastName: this._employeeDetail.lastName,
        loginID: this._employeeDetail.loginID,

        hireDate: {
          day: new Date(this._employeeDetail.hireDate).getUTCDate(),
          month: new Date(this._employeeDetail.hireDate).getUTCMonth() + 1,
          year: new Date(this._employeeDetail.hireDate).getUTCFullYear()
        },
        birthDate: {
          day: new Date(this._employeeDetail.birthDate).getUTCDate(),
          month: new Date(this._employeeDetail.birthDate).getUTCMonth() + 1,
          year: new Date(this._employeeDetail.birthDate).getUTCFullYear()
        },
        nationalIDNumber: this._employeeDetail.nationalIDNumber,
        jobTitle: this._employeeDetail.jobTitle,
        // gender: this._employeeDetail.gender,
        // maritalStatus: this._employeeDetail.maritalStatus,
        // salariedFlag: this._employeeDetail.salariedFlag,
        // currentFlag: this._employeeDetail.currentFlag,
        sickLeaveHours: this._employeeDetail.sickLeaveHours,
        vacationHours: this._employeeDetail.vacationHours
      });
      this.employeeForm.updateValueAndValidity();
    }
  }

  saveEmployee() {
    this.saveEmployeeDetail.emit(this.employeeForm.value);
  }

  onSaveClicked() {
    this.saveEmployeeDetail.emit(this.employeeForm.value);
  }

  onCancelClicked() {
    this.cancelEmployeeDetail.emit('');
  }

}
