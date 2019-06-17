import { FormGroup, ValidationErrors } from '@angular/forms';

export function checkPasswords(group: FormGroup): ValidationErrors {
  const pass = group.controls.password;
  const confirmPass = group.controls.confirmPassword;
  if (confirmPass.value && confirmPass.value.trim() === '') return;
  pass.value === confirmPass.value
    ? confirmPass.setErrors(confirmPass.errors)
    : confirmPass.setErrors({ ...confirmPass.errors, notEquivalent: true });
  return;
}
