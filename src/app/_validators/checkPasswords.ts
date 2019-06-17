import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkPasswords(): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const pass = group.controls.password;
    const confirmPass = group.controls.confirmPassword;
    pass.value === confirmPass.value ? confirmPass.setErrors(null) : confirmPass.setErrors({ notEquivalent: true });
    return;
  };
}
