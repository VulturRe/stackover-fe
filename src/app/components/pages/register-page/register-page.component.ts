import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

}
