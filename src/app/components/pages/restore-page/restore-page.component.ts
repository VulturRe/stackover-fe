import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from 'src/app/_validators/validators';
import { Helpers } from 'src/app/helpers';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restore-page',
  templateUrl: './restore-page.component.html',
  styleUrls: ['./restore-page.component.scss']
})
export class RestorePageComponent {

  submitted = false;

  restoreForm = this.fb.group({
    login: [null, [Validators.required, Validators.minLength(4)]]
  });

  constructor(private fb: FormBuilder,
              private errService: ErrorService,
              private userService: UserService) { }

  restore() {
    Helpers.setControlsIfNull(this.restoreForm);
    if (this.restoreForm.invalid) {
      return;
    }

    this.userService.restoreBegin(this.restoreForm.controls.login.value)
      .subscribe(() => this.submitted = true, err => this.errService.show(err.error));
  }

  resend() {
    this.restoreForm.controls.login.setValue(null);
    this.submitted = false;
  }

  getError(controlName: string) {
    return Helpers.getError(this.restoreForm, controlName);
  }
}
