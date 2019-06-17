import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from 'src/app/_validators/validators';
import { Helpers } from 'src/app/helpers';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }

  login() {
    Helpers.setControlsIfNull(this.loginForm);
    if (this.loginForm.invalid) return;
    const user: IUser = {
      login: this.loginForm.controls.login.value,
      password: this.loginForm.controls.password.value
    };

    this.userService.login(user)
      .subscribe(() => this.router.navigate(['/']));
  }

  getError(controlName: string) {
    return Helpers.getError(this.loginForm, controlName);
  }
}
