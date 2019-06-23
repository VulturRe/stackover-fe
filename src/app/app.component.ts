import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'stackover-fe';
  isLogged: boolean;

  constructor(private userService: UserService) {
    userService.isLoggedIn$.subscribe(value => {
      this.isLogged = value;
    });
  }
}
