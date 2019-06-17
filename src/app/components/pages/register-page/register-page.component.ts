import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswords } from 'src/app/_validators/checkPasswords';
import { Validators } from 'src/app/_validators/validators';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  registerForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    login: [null, [Validators.minLength(4), Validators.required]],
    password: [null, [Validators.minLength(6), Validators.required]],
    confirmPassword: [null, [Validators.minLength(6), Validators.required]]
  }, { validators: checkPasswords });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  register() {
    this.setControlsIfNull();
    if (this.registerForm.invalid) return;
    const user: IUser = {
      email: this.registerForm.controls.email.value,
      login: this.registerForm.controls.login.value,
      password: this.registerForm.controls.password.value
    };

    this.userService.register(user)
      .subscribe(() => this.router.navigate(['/']));
  }

  setControlsIfNull() {
    const controls = this.registerForm.controls;
    if (controls.email.value === null) controls.email.setValue('');
    if (controls.login.value === null) controls.login.setValue('');
    if (controls.password.value === null) controls.password.setValue('');
    if (controls.confirmPassword.value === null) controls.confirmPassword.setValue('');
  }

  getError(controlName: string) {
    const errors = this.registerForm.controls[controlName].errors;
    if (errors.email) return 'Неверный формат e-mail';
    if (errors.required) return 'Обязательное поле';
    if (errors.minLength) return `Минимальная длина ${errors.minLength.min} ${this.getPlural(errors.minLength.min)}`;
    if (errors.notEquivalent) return `Пароли не совпадают`;
  }

  private getPlural(count: number) {
    if (count === 1) return 'символ';
    if (count === 2 || count === 3 || count === 4) return 'символа';
    if (count > 20) {
      const str = count.toString();
      const lastDigit = parseInt(str[str.length - 1], 10);
      if (lastDigit === 1) return 'символ';
      if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) return 'символа';
    }
    return 'символов';
  }
}
