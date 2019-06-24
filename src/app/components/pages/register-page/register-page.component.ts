import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswords } from 'src/app/_validators/checkPasswords';
import { Validators } from 'src/app/_validators/validators';
import { Helpers } from 'src/app/helpers';
import { IUser } from 'src/app/models/user';
import { ErrorService } from 'src/app/services/error.service';
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
              private errService: ErrorService,
              private userService: UserService) {}

  register() {
    Helpers.setControlsIfNull(this.registerForm);
    if (this.registerForm.invalid) return;
    const user: IUser = {
      email: this.registerForm.controls.email.value,
      login: this.registerForm.controls.login.value,
      password: this.registerForm.controls.password.value
    };

    this.userService.register(user)
      .subscribe(() => this.router.navigate(['/']), err => this.errService.show(err.error));
  }

  getError(controlName: string) {
    return Helpers.getError(this.registerForm, controlName);
  }
}
