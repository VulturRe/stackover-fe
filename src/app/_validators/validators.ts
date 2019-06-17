import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validators {
  static email(control: AbstractControl): ValidationErrors {
    if (control.value === null || control.value.trim() === '') {
      return null;
    } else {
      // tslint:disable-next-line:max-line-length
      const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!regex.test(control.value)) {
        return { email: true };
      }
    }
  }

  static required(control: AbstractControl): ValidationErrors {
    if (control.value === null) {
      return null;
    } else if (control.value.trim().length === 0) {
      return { required: true };
    }
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value === null) {
        return null;
      } else if (control.value.trim() === '') {
        return { minLength: { min: minLength, actual: 0 } };
      } else if (control.value.length < minLength) {
        return { minLength: { min: minLength, actual: control.value.length } };
      }
    };
  }
}
