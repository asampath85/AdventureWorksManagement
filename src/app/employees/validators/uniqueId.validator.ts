import { Injectable } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UniqueIdValidatorModel } from '../models/uniqueIdValidator.model';

@Injectable({
    providedIn: 'root'
})
export class UniqueIdValidator {
    constructor(private employeeService: EmployeeService) { }

    validateLoginId(employeeId: number): AsyncValidatorFn {
        return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            const model: UniqueIdValidatorModel = {
                id: employeeId,
                idToBeValidated: ctrl.value
            };
            return this.employeeService.loginIdCheck(model).pipe(
                map(isTaken => (isTaken ? { 'loginIdExists': true } : null)));
        };
    }

}
