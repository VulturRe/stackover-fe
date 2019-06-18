import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { checkPasswords } from 'src/app/_validators/checkPasswords';
import { Validators } from 'src/app/_validators/validators';
import { Helpers } from 'src/app/helpers';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.scss']
})
export class ResetPageComponent implements OnInit {

  submitted = false;
  private token: string;

  passwordForm = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
  }, { validators: checkPasswords });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
    });
  }

  setPassword() {
    Helpers.setControlsIfNull(this.passwordForm);
    if (this.passwordForm.invalid) {
      return;
    }

    this.userService.restoreEnd(this.token, this.passwordForm.controls.password.value)
      .subscribe(() => this.submitted = true);
  }

  login() {
    this.router.navigate(['/login']);
  }

  getError(controlName: string) {
    return Helpers.getError(this.passwordForm, controlName);
  }
}
