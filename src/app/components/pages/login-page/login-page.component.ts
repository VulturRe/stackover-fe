import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router,
              private userService: UserService) { }

  login() {
    const user: IUser = {
      login: this.loginForm.controls.login.value,
      password: this.loginForm.controls.password.value
    };

    this.userService.login(user)
      .subscribe(() => this.router.navigate(['/']));
  }
}
