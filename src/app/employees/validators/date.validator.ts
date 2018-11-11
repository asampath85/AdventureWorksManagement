import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class DateValidator {
    static validateAge(minimumAge: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean | null } => {
            if (DateValidator.getAge(c.value) < minimumAge) {
                return { 'invalidAge': true };
            }
            return null;
        };
    }

    static getAge(date: NgbDate): number {
        const today = new Date();
        const selectedDate = new Date(date.year, date.month - 1, date.day);

        let age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
            age--;
        }

        return age;

    }
}
