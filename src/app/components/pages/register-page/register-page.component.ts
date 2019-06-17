import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswords } from 'src/app/_validators/checkPasswords';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    login: ['', [Validators.minLength(4), Validators.required]],
    password: ['', [Validators.minLength(6), Validators.required]],
    confirmPassword: ['', [Validators.minLength(6), Validators.required]]
  }, { validators: checkPasswords() });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit() {
  }

  register() {
    if (this.registerForm.invalid) return;
    const user: IUser = {
      email: this.registerForm.controls.email.value,
      login: this.registerForm.controls.login.value,
      password: this.registerForm.controls.password.value
    };

    this.userService.register(user)
      .subscribe(() => this.router.navigate(['/']));
  }
}
