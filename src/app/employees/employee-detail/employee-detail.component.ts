import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';
import { DateValidator } from '../validators/date.validator';
import { EmployeeService } from '../employee.service';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UniqueIdValidator } from '../validators/uniqueId.validator';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employeeForm: FormGroup;
  private _employeeDetail: EmployeeModel;
  submitted = false;

  @Input()
  set employeeDetail(employeeDetail: EmployeeModel) {
    this._employeeDetail = employeeDetail;
    this.initializeEmployeeDetail();
  }

  get f() {
    return this.employeeForm.controls;
  }

  @Output() saveEmployeeDetail: EventEmitter<EmployeeModel> = new EventEmitter<EmployeeModel>();

  @Output() cancelEmployeeDetail: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private uniqueIdValidator: UniqueIdValidator) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      loginID: ['', [Validators.required]],
      hireDate: ['', [Validators.required, DateValidator.validateAge(1)]],
      birthDate: ['', [Validators.required, DateValidator.validateAge(18)]],
      nationalIDNumber: ['', Validators.required],
      jobTitle: ['', Validators.required],
      gender: 'M',
      maritalStatus: 'M',
      salariedFlag: true,
      currentFlag: true,
      vacationHours: ['', Validators.required],
      sickLeaveHours: ['', Validators.required]
    });
  }

  initializeEmployeeDetail() {
    this.submitted = false;
    if (this._employeeDetail !== undefined) {
      this.f.loginID.setAsyncValidators(
        [this.uniqueIdValidator.validateLoginId(this._employeeDetail.businessEntityID).bind(this.uniqueIdValidator)]);

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
    this.submitted = true;
    if (this.employeeForm.valid) {
      this.saveEmployeeDetail.emit(this.employeeForm.value);
    } else {
      // alert(this.f.firstName.errors.required);
    }
  }

  onSaveClicked() {
    this.saveEmployeeDetail.emit(this.employeeForm.value);
  }

  onCancelClicked() {
    this.cancelEmployeeDetail.emit('');
  }
}
