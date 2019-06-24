import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        height: '64px'
      })),
      state('hide', style({
        height: '0'
      })),
      transition('hide=>show', [animate('0.2s')]),
      transition('show=>hide', [animate('0.2s')])
    ])
  ]
})
export class AppComponent {

  show = false;
  error: string;
  isLogged: boolean;

  constructor(private errService: ErrorService,
              private userService: UserService) {
    userService.isLoggedIn$.subscribe(value => {
      this.isLogged = value;
    });

    errService.error$.subscribe(errMsg => {
      this.show = !!errMsg;
      this.error = errMsg;
    });
  }
}
